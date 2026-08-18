import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SUBJECTS } from "@/lib/curriculum";
import { dueCards, scopeLabel } from "@/lib/exam-vault";
import { useDesk } from "@/lib/store";
import type { ExamScope, SubjectId } from "@/lib/types";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/exam")({ component: ExamVaultPage });

function ExamVaultPage() {
  const examCards = useDesk((s) => s.examCards);
  const seedExamIfEmpty = useDesk((s) => s.seedExamIfEmpty);
  const reviewExamCard = useDesk((s) => s.reviewExamCard);
  const [scope, setScope] = useState<ExamScope | "all">("unit");
  const [subjectFilter, setSubjectFilter] = useState<SubjectId | "all">("accounting");
  const [flipped, setFlipped] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    seedExamIfEmpty();
  }, [seedExamIfEmpty]);

  const pool = useMemo(() => {
    const base = dueCards(examCards ?? [], scope);
    if (subjectFilter === "all") return base;
    return base.filter((c) => c.subjectId === subjectFilter);
  }, [examCards, scope, subjectFilter]);

  const card = pool[idx] ?? pool[0];
  const unitCount = (examCards ?? []).filter((c) => c.scope !== "final").length;
  const finalCount = (examCards ?? []).filter((c) => c.scope !== "unit").length;
  const dueNow = pool.length;

  useEffect(() => {
    setIdx(0);
    setFlipped(false);
  }, [scope, subjectFilter]);

  function grade(knew: boolean) {
    if (!card) return;
    reviewExamCard(card.id, knew);
    setFlipped(false);
    setIdx((i) => (pool.length <= 1 ? 0 : i % Math.max(1, pool.length - 1)));
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Exam vault</p>
        <h1 className="mt-1 font-display text-4xl">Remember what the test will ask.</h1>
        <p className="mt-3 max-w-xl text-sm text-muted">
          The chairs file formulas, traps, lecture notes, and every quiz miss.
          Cram unit tests here. Switch to Final when the term closes.
        </p>
      </header>

      <section className="grid grid-cols-3 gap-3">
        <Mini label="Unit bank" value={String(unitCount)} />
        <Mini label="Final bank" value={String(finalCount)} />
        <Mini label="Due now" value={String(dueNow)} />
      </section>

      <div className="flex flex-wrap gap-2">
        {(["unit", "final", "all"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScope(s)}
            className={`h-10 rounded-md px-3 text-sm ${
              scope === s ? "bg-accent text-accent-fg" : "bg-raised text-muted"
            }`}
          >
            {s === "all" ? "All due" : s === "unit" ? "Unit test" : "Final"}
          </button>
        ))}
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value as SubjectId | "all")}
          className="h-10 rounded-md border border-line bg-surface px-3 text-sm"
        >
          <option value="all">All chairs</option>
          {SUBJECTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {!card ? (
        <div className="rounded-xl border border-line bg-surface p-8 text-sm text-muted">
          Nothing due in this filter. Open a chapter, miss a check, or file lecture notes
          — the vault fills itself. You can also ask a chair to “save this for the final.”
        </div>
      ) : (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="w-full rounded-xl border border-line bg-surface p-8 text-left shadow-panel"
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
              {scopeLabel(card.scope)} · {card.subjectId} · {card.source}
            </p>
            <p className="mt-4 font-display text-2xl leading-snug">
              {flipped ? card.back : card.front}
            </p>
            {flipped ? (
              <p className="mt-4 text-sm text-amber">{card.why}</p>
            ) : (
              <p className="mt-6 text-xs text-faint">Tap to reveal</p>
            )}
          </button>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => grade(false)}>
              Missed — keep it
            </Button>
            <Button onClick={() => grade(true)}>Knew it</Button>
            <span className="self-center text-xs text-muted tabular-nums">
              {Math.min(idx + 1, pool.length)} / {pool.length} due
            </span>
          </div>
        </div>
      )}

      <section>
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Cram sheet</p>
        <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
          {(examCards ?? [])
            .filter((c) => {
              if (subjectFilter !== "all" && c.subjectId !== subjectFilter) return false;
              if (scope === "unit") return c.scope !== "final";
              if (scope === "final") return c.scope !== "unit";
              return true;
            })
            .slice(0, 24)
            .map((c) => (
              <li key={c.id} className="px-4 py-3 text-sm">
                <p className="font-medium">{c.front}</p>
                <p className="mt-1 text-muted">{c.back}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-faint">
                  {scopeLabel(c.scope)} · box {c.box}
                </p>
              </li>
            ))}
        </ul>
        <Link to="/" className="mt-4 inline-block text-sm text-muted underline">
          Back to desk
        </Link>
      </section>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-4">
      <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl tabular-nums">{value}</p>
    </div>
  );
}
