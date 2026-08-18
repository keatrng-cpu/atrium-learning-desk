import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { getSubject } from "@/lib/curriculum";
import { cardsFromChapterPin } from "@/lib/exam-vault";
import { chapterKey, useDesk } from "@/lib/store";
import { ProfessorChat } from "@/components/professor-chat";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { MasteryStatus, SubjectId } from "@/lib/types";

const searchSchema = z.object({
  chapter: z.string().optional(),
});

export const Route = createFileRoute("/subject/$id")({
  validateSearch: searchSchema,
  component: SubjectDesk,
});

const STATUS_LABEL: Record<MasteryStatus, string> = {
  not_started: "Not started",
  learning: "Learning",
  practiced: "Practiced",
  mastered: "Mastered",
};

function SubjectDesk() {
  const { id } = Route.useParams();
  const { chapter: chapterQ } = Route.useSearch();
  const subject = getSubject(id);
  const progress = useDesk((s) => s.progress);
  const mistakes = useDesk((s) => s.mistakes);
  const markLearning = useDesk((s) => s.markLearning);
  const markPractice = useDesk((s) => s.markPractice);
  const recordQuiz = useDesk((s) => s.recordQuiz);
  const rememberCards = useDesk((s) => s.rememberCards);
  const seedExamIfEmpty = useDesk((s) => s.seedExamIfEmpty);
  const [pinned, setPinned] = useState(false);

  const [tab, setTab] = useState<"notes" | "practice" | "quiz" | "mistakes" | "chat">("notes");
  const [simple, setSimple] = useState(false);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [quizDone, setQuizDone] = useState(false);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});

  const chapter = useMemo(() => {
    if (!subject) return undefined;
    return (
      subject.chapters.find((c) => c.id === chapterQ) ??
      subject.chapters.find((c) => {
        const p = progress[chapterKey(subject.id, c.id)];
        return p && p.status !== "mastered";
      }) ??
      subject.chapters[0]
    );
  }, [subject, chapterQ, progress]);

  if (!subject || !chapter) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <p className="font-display text-3xl">Chair not found</p>
        <Link to="/" className="mt-4 inline-block text-sm text-muted underline">
          Return to desk
        </Link>
      </div>
    );
  }

  const sub = subject;
  const ch = chapter;
  const p = progress[chapterKey(sub.id, ch.id)];
  const status = p?.status ?? "not_started";
  const subjectMistakes = mistakes.filter((m) => m.subjectId === sub.id);

  function startNotes() {
    markLearning(sub.id, ch.id, 10);
  }

  function gradeQuiz() {
    const misses: {
      subjectId: SubjectId;
      chapterId: string;
      question: string;
      yourAnswer: string;
      correct: string;
      tags: string[];
    }[] = [];
    let right = 0;
    for (const q of ch.quiz) {
      const choice = picked[q.id];
      if (choice === q.answer) right += 1;
      else {
        misses.push({
          subjectId: sub.id,
          chapterId: ch.id,
          question: q.prompt,
          yourAnswer: choice === undefined ? "—" : q.choices[choice],
          correct: q.choices[q.answer],
          tags: q.tags,
        });
      }
    }
    recordQuiz({
      subjectId: sub.id,
      chapterId: ch.id,
      score: right / ch.quiz.length,
      minutes: 12,
      misses,
    });
    setQuizDone(true);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{subject.professor}</p>
        <h1 className="mt-1 font-display text-3xl">{subject.name}</h1>
        <p className="mt-2 text-sm text-muted">{subject.title}</p>
        <p className="mt-2 text-sm text-muted">{subject.blurb}</p>
        <ol className="mt-6 space-y-1">
          {subject.chapters.map((ch, i) => {
            const st = progress[chapterKey(subject.id, ch.id)]?.status ?? "not_started";
            const active = ch.id === chapter.id;
            return (
              <li key={ch.id}>
                <Link
                  to="/subject/$id"
                  params={{ id: subject.id }}
                  search={{ chapter: ch.id }}
                  className={`flex items-start gap-2 rounded-md px-2 py-2 text-sm leading-snug ${
                    active ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg"
                  }`}
                >
                  <span className="w-5 shrink-0 tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1 whitespace-normal">{ch.title}</span>
                </Link>
                <div className="mb-1 ml-9 text-[10px] uppercase tracking-wider text-faint">
                  {STATUS_LABEL[st]}
                </div>
              </li>
            );
          })}
        </ol>
      </aside>

      <section className="min-w-0 space-y-5">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-panel">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                {STATUS_LABEL[status]} · {chapter.minutes} min
              </p>
              <h2 className="mt-1 font-display text-3xl">{chapter.title}</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">{chapter.objective}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSimple((v) => !v);
                startNotes();
              }}
            >
              {simple ? "Full notes" : "Explain it simply"}
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {(
              [
                ["notes", "Notes"],
                ["practice", "Practice"],
                ["quiz", "Mastery check"],
                ["mistakes", "Mistake log"],
                ["chat", "Chair"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                className={`h-10 rounded-md px-3 text-sm ${
                  tab === k ? "bg-accent text-accent-fg" : "bg-raised text-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {tab === "notes" ? (
          <article className="space-y-4 rounded-xl border border-line bg-surface p-5">
            {simple ? (
              <p className="font-display text-xl leading-snug">{chapter.simple}</p>
            ) : (
              <>
                <p className="font-display text-xl leading-snug">{chapter.simple}</p>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
                  {chapter.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted">Traps</p>
                  <ul className="mt-2 space-y-1 text-sm text-amber">
                    {chapter.pitfalls.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted">Keep on the desk</p>
                  <ul className="mt-2 space-y-1 font-mono text-sm">
                    {chapter.formulas.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            <div className="flex flex-wrap gap-2">
              <Button onClick={startNotes}>Mark as studying</Button>
              <Button
                variant="outline"
                onClick={() => {
                  seedExamIfEmpty();
                  rememberCards(cardsFromChapterPin(sub.id, ch.id));
                  setPinned(true);
                }}
              >
                {pinned ? "Filed for exams" : "Save for unit + final"}
              </Button>
            </div>
          </article>
        ) : null}

        {tab === "practice" ? (
          <div className="space-y-4">
            {chapter.practice.map((item) => {
              const done = p?.practiceDone.includes(item.id);
              return (
                <div key={item.id} className="rounded-xl border border-line bg-surface p-5">
                  <p className="text-sm font-medium">{item.prompt}</p>
                  <p className="mt-2 text-sm text-muted">Hint: {item.hint}</p>
                  {reveal[item.id] ? (
                    <p className="mt-3 text-sm leading-relaxed text-sage">{item.solution}</p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReveal((r) => ({ ...r, [item.id]: true }))}
                    >
                      Show solution
                    </Button>
                    <Button
                      size="sm"
                      disabled={done}
                      onClick={() => markPractice(subject.id as SubjectId, chapter.id, item.id)}
                    >
                      {done ? "Logged" : "I worked this"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {tab === "quiz" ? (
          <div className="space-y-4 rounded-xl border border-line bg-surface p-5">
            {chapter.quiz.map((q, i) => (
              <fieldset key={q.id} className="space-y-2 border-b border-line pb-4 last:border-0">
                <legend className="text-sm font-medium">
                  {i + 1}. {q.prompt}
                </legend>
                <div className="mt-2 grid gap-2">
                  {q.choices.map((c, idx) => {
                    const selected = picked[q.id] === idx;
                    const show = quizDone;
                    const correct = idx === q.answer;
                    return (
                      <label
                        key={c}
                        className={`flex min-h-11 items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                          show && correct
                            ? "border-sage text-sage"
                            : show && selected && !correct
                              ? "border-rose text-rose"
                              : selected
                                ? "border-accent"
                                : "border-line"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          className="accent-current"
                          checked={selected}
                          disabled={quizDone}
                          onChange={() => setPicked((prev) => ({ ...prev, [q.id]: idx }))}
                        />
                        {c}
                      </label>
                    );
                  })}
                </div>
                {quizDone ? <p className="text-sm text-muted">{q.explain}</p> : null}
              </fieldset>
            ))}
            {!quizDone ? (
              <Button onClick={gradeQuiz}>Submit check</Button>
            ) : (
              <p className="text-sm text-muted">
                Score recorded. 85%+ promotes the chapter to Mastered. Repair misses in the log.
              </p>
            )}
          </div>
        ) : null}

        {tab === "mistakes" ? (
          <div className="space-y-3">
            {subjectMistakes.length === 0 ? (
              <p className="text-sm text-muted">No misses yet. That will change. Good.</p>
            ) : (
              subjectMistakes.slice(0, 20).map((m) => (
                <div key={m.id} className="rounded-xl border border-line bg-surface p-4 text-sm">
                  <p className="font-medium">{m.question}</p>
                  <p className="mt-1 text-rose">You: {m.yourAnswer}</p>
                  <p className="text-sage">Correct: {m.correct}</p>
                </div>
              ))
            )}
          </div>
        ) : null}

        {tab === "chat" ? (
          <div className="h-[520px]">
            <ProfessorChat subjectId={subject.id} chapterId={chapter.id} />
          </div>
        ) : null}

        <Progress
          value={
            status === "mastered"
              ? 100
              : status === "practiced"
                ? 70
                : status === "learning"
                  ? 35
                  : 4
          }
        />
      </section>
    </div>
  );
}
