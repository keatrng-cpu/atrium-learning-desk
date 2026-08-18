import { SUBJECT_MAP, getChapter, getSubject } from "./curriculum";
import type { ChatMessage, SkillProfile, SubjectId } from "./types";

function packProfile(profile: SkillProfile) {
  return `Speed ~${profile.speedMinutesPerChapter} min/chapter. Accuracy ${(profile.accuracy * 100).toFixed(0)}%. Strengths: ${profile.strengths.join(", ")}. Weak points: ${profile.weaknesses.join(", ")}. Streak ${profile.streakDays}d.`;
}

export function professorSystemPrompt(input: {
  subjectId: SubjectId | "master";
  chapterId?: string;
  scholarName: string;
  profile: SkillProfile;
  confusion?: string;
  ingested?: string;
  examMemory?: string;
}) {
  if (input.subjectId === "master") {
    return `You are the Master Professor of Atrium Learning Desk — the Overseer.
Student: ${input.scholarName}.
${packProfile(input.profile)}
Voice: calm, exact, slightly formal. No cheerleading. No emoji.
Job: decide what to study next, protect a 3.5+ GPA on the Northland Accounting Transfer Pathway, then Finance at Minnesota State Mankato, with PE as the long game. The student already runs businesses/apps.
Rules:
- Prefer Accounting until its mastery is clearly ahead.
- Give one next action, then a short reason.
- If asked a subject question, answer it, then send them back to the specialist when depth is needed.
- Keep answers tight (120–220 words) unless they ask for depth.
- You remember exam-critical facts. If the student asks about a unit test or final, drill those facts first.
${input.examMemory ? `Exam vault (already saved):\n${input.examMemory}` : ""}
- When you teach something that will appear on a unit test or final, append this exact block after the answer (no other commentary):
<!--ATRIUM
[{"front":"short prompt","back":"the fact they must recall","scope":"unit|final|both","why":"why it is exam-critical","subjectId":"${input.subjectId === "master" ? "accounting" : input.subjectId}"}]
-->
Max 3 cards. Only high-value recall items (formulas, classifications, traps).`;
  }

  const subject = SUBJECT_MAP[input.subjectId];
  const chapter = input.chapterId ? getChapter(input.subjectId, input.chapterId) : undefined;
  return `You are ${subject.professor}, ${subject.title} at Atrium Learning Desk.
Voice: ${subject.voice}
Student: ${input.scholarName}.
${packProfile(input.profile)}
Subject: ${subject.name}. ${subject.blurb}
${chapter ? `Current chapter: ${chapter.title}. Objective: ${chapter.objective}\nSimple version: ${chapter.simple}` : ""}
${input.confusion ? `Student said this is confusing: ${input.confusion}` : ""}
${input.ingested ? `Student uploaded notes:\n${input.ingested.slice(0, 2500)}` : ""}
Rules:
- Teach for mastery. Short sentences. Then one worked example.
- If they are wrong, name the exact misconception.
- Tie accounting answers to the equation / debit-credit grammar.
- Tie finance answers to cash, risk, and who gets paid.
- No emoji. No filler. 120–280 words unless they ask for a full lecture.
- End with one check question they should answer next.
${input.examMemory ? `Already in their exam vault:\n${input.examMemory}` : ""}
- After the answer, if anything is exam-critical, append:
<!--ATRIUM
[{"front":"...","back":"...","scope":"unit|final|both","why":"...","subjectId":"${input.subjectId}"}]
-->
Scope: "unit" for this block's test, "final" for cumulative, "both" for formulas and classic traps. Max 3 cards.`;
}

export function localProfessorReply(
  question: string,
  subjectId: SubjectId | "master",
  chapterId: string | undefined,
  profile: SkillProfile,
): string {
  const q = question.toLowerCase();

  if (subjectId === "master") {
    const leak = profile.weaknesses[0];
    if (q.includes("gpa") || q.includes("grade")) {
      return `GPA is a trail of proof, not a wish. Your running accuracy is ${(profile.accuracy * 100).toFixed(0)}%. That maps to the 3.5+ band only if quizzes stay at 85% or better. Do not open a new subject until the open Accounting chapter is practiced and checked. Next action: sit the current mastery check, then write every miss into the mistake log and re-explain it in one sentence.`;
    }
    if (q.includes("final") || q.includes("unit test") || q.includes("exam")) {
      return `Exams are won on recall of traps and formulas, not on rereading. Open Exams on the desk. Drill Unit test until due is zero, then switch to Final the week before. Every quiz miss is already in that vault. File lecture notes in Intake — confusion lines become cards automatically. Next action: 20 minutes of due cards, no new chapters until the due stack is thin.`;
    }
    return `Today we protect the Accounting spine. Weak tags on file: ${leak}. Study one chapter to practiced, then take the check the same day — never split those two. If you still have energy, do 20 minutes of Quantitative (spreadsheets). Business and Finance wait until Accounting mastery is visibly ahead. Your companies already teach operations; the desk must teach the books. What chapter are you opening in the next hour?`;
  }

  const subject = getSubject(subjectId);
  const chapter = chapterId ? getChapter(subjectId, chapterId) : undefined;

  if (chapter) {
    const hit =
      chapter.notes.find((n) => q.split(" ").some((w) => w.length > 4 && n.toLowerCase().includes(w))) ??
      chapter.simple;
    const pit = chapter.pitfalls[0];
    const formula = chapter.formulas[0];
    const practice = chapter.practice[0];
    return `${chapter.title} — the clean version: ${chapter.simple}

Hold this: ${hit}
Formula to keep on the desk: ${formula}
The usual trap: ${pit}

Worked line: ${practice.prompt} → ${practice.solution}

Check question: ${chapter.quiz[0]?.prompt ?? "Explain this chapter to me as if I am buying the company tomorrow."}`;
  }

  if (subject) {
    const first = subject.chapters[0];
    return `${subject.professor} here. ${subject.blurb} We start at “${first.title}.” ${first.simple} If your question is about a specific idea, name the chapter or paste the homework line. I will not wave my hands — I will make you write the entry or the formula. What exactly is unclear?`;
  }

  return "Name the subject and the stuck sentence. I will take it from there.";
}

export function seedGreeting(
  subjectId: SubjectId | "master",
  scholarName: string,
): ChatMessage {
  if (subjectId === "master") {
    return {
      id: "greet-master",
      role: "professor",
      at: Date.now(),
      text: `${scholarName}. The desk is open. Accounting is the priority path. I will watch mastery, speed, and leaks — you will not wander. Tell me what you studied last and what felt thin.`,
    };
  }
  const s = SUBJECT_MAP[subjectId];
  return {
    id: `greet-${subjectId}`,
    role: "professor",
    at: Date.now(),
    text: `${s.professor}. ${s.voice.split(".")[0]}. We work ${s.name.toLowerCase()} until it is boringly reliable. Paste a lecture line, a homework item, or ask me to explain the open chapter simply.`,
  };
}
