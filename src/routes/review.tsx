import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { buildProfile, weeklyReview } from "@/lib/mastery";
import { useDesk } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/review")({ component: ReviewPage });

function ReviewPage() {
  const progress = useDesk((s) => s.progress);
  const activity = useDesk((s) => s.activity);
  const mistakes = useDesk((s) => s.mistakes);
  const resetDesk = useDesk((s) => s.resetDesk);
  const profile = useMemo(
    () => buildProfile(progress, activity, mistakes),
    [progress, activity, mistakes],
  );
  const review = weeklyReview(activity, progress, profile);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
          Master Professor
        </p>
        <h1 className="mt-1 font-display text-4xl">Weekly performance.</h1>
        <p className="mt-3 text-sm text-muted">
          Cadence, leaks, and the one adjustment that actually moves GPA.
        </p>
      </header>

      <section className="grid grid-cols-3 gap-3">
        <Mini label="Minutes" value={String(review.minutes)} />
        <Mini label="Checks" value={String(review.quizzes)} />
        <Mini
          label="Week avg"
          value={review.avg === null ? "—" : `${Math.round(review.avg * 100)}%`}
        />
      </section>

      <ol className="space-y-4 rounded-xl border border-line bg-surface p-6">
        {review.lines.map((line, i) => (
          <li key={line} className="flex gap-4">
            <span className="font-display text-2xl text-faint">{String(i + 1).padStart(2, "0")}</span>
            <p className="pt-1 text-sm leading-relaxed">{line}</p>
          </li>
        ))}
      </ol>

      <section className="rounded-xl border border-line bg-surface p-5 text-sm">
        <p className="text-[11px] uppercase tracking-wider text-muted">Standing orders</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          <li>Accounting is the spine until it is ahead of every other chair.</li>
          <li>Notes and practice the same day. Never leave a chapter at “learning” overnight.</li>
          <li>85% on the check or you do not advance. Pride is not a grade.</li>
          <li>Business questions go to Voss after the books for the week are closed.</li>
        </ul>
      </section>

      <Button variant="outline" onClick={() => resetDesk()}>
        Reset desk data
      </Button>
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
