import { SUBJECTS, getChapter } from "./curriculum";
import type { ExamCard, ExamScope, IngestedNote, Mistake, SubjectId } from "./types";

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}


export function cardFingerprint(front: string, back: string, subjectId: string) {
  return `${subjectId}::${front.toLowerCase().replace(/\s+/g, " ").trim().slice(0, 80)}::${back.toLowerCase().replace(/\s+/g, " ").trim().slice(0, 80)}`;
}

export function seedCurriculumCards(): ExamCard[] {
  const now = Date.now();
  const cards: ExamCard[] = [];
  for (const subject of SUBJECTS) {
    subject.chapters.forEach((ch, i) => {
      const later = now + 14 * 24 * 60 * 60 * 1000;
      const due = subject.id === "accounting" && i < 6 ? now : later;
      const scope: ExamScope = i < Math.ceil(subject.chapters.length / 2) ? "unit" : "both";
      for (const formula of ch.formulas) {
        cards.push(
          makeCard({
            subjectId: subject.id,
            chapterId: ch.id,
            scope: "both",
            front: `Formula — ${ch.title}`,
            back: formula,
            why: "Formulas show up on unit tests and the final. Write it from memory.",
            source: "curriculum",
            now: due,
          }),
        );
      }
      for (const pit of ch.pitfalls) {
        cards.push(
          makeCard({
            subjectId: subject.id,
            chapterId: ch.id,
            scope,
            front: `Trap in ${ch.title}?`,
            back: pit,
            why: "Professors write items that punish the usual mix-up.",
            source: "curriculum",
            now,
          }),
        );
      }
      for (const q of ch.quiz) {
        cards.push(
          makeCard({
            subjectId: subject.id,
            chapterId: ch.id,
            scope,
            front: q.prompt,
            back: `${q.choices[q.answer]}. ${q.explain}`,
            why: "If it is in the mastery check, it is fair game on the exam.",
            source: "curriculum",
            now,
          }),
        );
      }
    });
  }
  return cards;
}

function makeCard(input: {
  subjectId: SubjectId;
  chapterId?: string;
  scope: ExamScope;
  front: string;
  back: string;
  why: string;
  source: ExamCard["source"];
  now: number;
}): ExamCard {
  return {
    id: `ex-${Math.abs(hash(cardFingerprint(input.front, input.back, input.subjectId)))}-${input.source}`,
    subjectId: input.subjectId,
    chapterId: input.chapterId,
    scope: input.scope,
    front: input.front,
    back: input.back,
    why: input.why,
    source: input.source,
    box: 0,
    dueAt: input.now,
    seen: 0,
    createdAt: input.now,
  };
}

export function cardsFromMisses(misses: Mistake[]): ExamCard[] {
  const now = Date.now();
  return misses.map((m) =>
    makeCard({
      subjectId: m.subjectId,
      chapterId: m.chapterId,
      scope: "both",
      front: m.question,
      back: `Correct: ${m.correct}. You said: ${m.yourAnswer}.`,
      why: "You missed this once. Unit tests and the final will ask it again.",
      source: "miss",
      now,
    }),
  );
}

export function cardsFromIntake(note: IngestedNote): ExamCard[] {
  const now = Date.now();
  const cards: ExamCard[] = [];
  if (note.confusion) {
    cards.push(
      makeCard({
        subjectId: note.subjectId,
        scope: "unit",
        front: `What was confusing in “${note.title}”?`,
        back: note.confusion,
        why: "If it confused you in lecture, it is a likely exam item.",
        source: "intake",
        now,
      }),
    );
  }
  const lines = note.body
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 24 && l.length < 220)
    .slice(0, 4);
  for (const line of lines) {
    cards.push(
      makeCard({
        subjectId: note.subjectId,
        scope: "unit",
        front: `From lecture: ${note.title}`,
        back: line,
        why: "Pulled from your filed notes so it is not lost before the unit test.",
        source: "intake",
        now,
      }),
    );
  }
  return cards;
}

export function cardsFromChapterPin(subjectId: SubjectId, chapterId: string): ExamCard[] {
  const ch = getChapter(subjectId, chapterId);
  if (!ch) return [];
  const now = Date.now();
  return [
    makeCard({
      subjectId,
      chapterId,
      scope: "both",
      front: `In one sentence: ${ch.title}`,
      back: ch.simple,
      why: "If you can say this cleanly, the exam items around it get easy.",
      source: "pin",
      now,
    }),
    ...ch.formulas.map((f) =>
      makeCard({
        subjectId,
        chapterId,
        scope: "both",
        front: `Write the ${ch.title} formula`,
        back: f,
        why: "Pinned for the next unit test and the final.",
        source: "pin",
        now,
      }),
    ),
  ];
}

export function mergeCards(existing: ExamCard[], incoming: ExamCard[]): ExamCard[] {
  const map = new Map(existing.map((c) => [cardFingerprint(c.front, c.back, c.subjectId), c]));
  for (const card of incoming) {
    const key = cardFingerprint(card.front, card.back, card.subjectId);
    if (!map.has(key)) map.set(key, card);
  }
  return [...map.values()];
}

export function dueCards(cards: ExamCard[], scope: ExamScope | "all", now = Date.now()) {
  return cards
    .filter((c) => {
      if (c.dueAt > now) return false;
      if (scope === "all") return true;
      if (scope === "unit") return c.scope === "unit" || c.scope === "both";
      return c.scope === "final" || c.scope === "both";
    })
    .sort((a, b) => {
      const pri = (c: ExamCard) =>
        (c.source === "miss" ? 0 : c.source === "intake" ? 1 : 2) + c.box;
      return pri(a) - pri(b) || a.dueAt - b.dueAt;
    });
}

const BOX_HOURS = [0, 8, 24, 72, 168, 336];

export function reviewAdvance(card: ExamCard, knew: boolean, now = Date.now()): ExamCard {
  const box = knew ? Math.min(5, card.box + 1) : 0;
  const hours = BOX_HOURS[box] ?? 24;
  return {
    ...card,
    box,
    seen: card.seen + 1,
    lastResult: knew ? "knew" : "missed",
    dueAt: now + hours * 60 * 60 * 1000,
  };
}

export function parseExamBlock(raw: string): { text: string; cards: Omit<ExamCard, "id" | "box" | "dueAt" | "seen" | "createdAt">[] } {
  const match = raw.match(/<!--ATRIUM([\s\S]*?)-->/);
  const text = raw.replace(/<!--ATRIUM[\s\S]*?-->/g, "").trim();
  if (!match) return { text, cards: [] };
  try {
    const parsed = JSON.parse(match[1].trim()) as Array<{
      front?: string;
      back?: string;
      scope?: ExamScope;
      why?: string;
      subjectId?: SubjectId;
      chapterId?: string;
    }>;
    const cards = parsed
      .filter((p) => p.front && p.back)
      .slice(0, 4)
      .map((p) => ({
        subjectId: (p.subjectId ?? "accounting") as SubjectId,
        chapterId: p.chapterId,
        scope: (p.scope === "final" || p.scope === "unit" || p.scope === "both" ? p.scope : "unit") as ExamScope,
        front: p.front!,
        back: p.back!,
        why: p.why ?? "Saved from the chair for exam recall.",
        source: "chat" as const,
      }));
    return { text, cards };
  } catch {
    return { text, cards: [] };
  }
}

export function localExtractCards(
  question: string,
  reply: string,
  subjectId: SubjectId | "master",
  chapterId?: string,
): ExamCard[] {
  if (subjectId === "master") return [];
  const now = Date.now();
  const q = question.toLowerCase();
  const wants =
    q.includes("exam") ||
    q.includes("final") ||
    q.includes("test") ||
    q.includes("remember") ||
    q.includes("formula") ||
    q.includes("quiz");
  if (!wants) return [];
  const chapter = chapterId ? getChapter(subjectId, chapterId) : undefined;
  const scope: ExamScope = q.includes("final") ? "final" : q.includes("unit") ? "unit" : "both";
  const snippet = reply.split("\n").filter((l) => l.trim().length > 20).slice(0, 2).join(" ");
  if (!snippet) return [];
  return [
    makeCard({
      subjectId,
      chapterId,
      scope,
      front: question.slice(0, 160),
      back: snippet.slice(0, 400),
      why: chapter
        ? `Chair extract from ${chapter.title}. Keep this for the exam.`
        : "Chair extract. Keep this for the exam.",
      source: "chat",
      now,
    }),
  ];
}

export function cardsFromExtracts(
  extracts: Array<{
    subjectId: SubjectId;
    chapterId?: string;
    scope: ExamScope;
    front: string;
    back: string;
    why: string;
    source: "chat";
  }>,
): ExamCard[] {
  const now = Date.now();
  return extracts.map((e) =>
    makeCard({
      subjectId: e.subjectId,
      chapterId: e.chapterId,
      scope: e.scope,
      front: e.front,
      back: e.back,
      why: e.why,
      source: "chat",
      now,
    }),
  );
}

export function scopeLabel(scope: ExamScope) {
  if (scope === "unit") return "Unit test";
  if (scope === "final") return "Final";
  return "Unit + final";
}
