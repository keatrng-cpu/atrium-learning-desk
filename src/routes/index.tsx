import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { SUBJECTS } from "@/lib/curriculum";
import {
  buildProfile,
  overallMastery,
  projectedGpa,
  recommendFocus,
} from "@/lib/mastery";
import { subjectMastery, useDesk } from "@/lib/store";
import { ProfessorChat } from "@/components/professor-chat";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({ component: DeskHome });

function DeskHome() {
  const scholarName = useDesk((s) => s.scholarName);
  const setName = useDesk((s) => s.setName);
  const setHydrated = useDesk((s) => s.setHydrated);
  const progress = useDesk((s) => s.progress);
  const activity = useDesk((s) => s.activity);
  const mistakes = useDesk((s) => s.mistakes);
  const deadlines = useDesk((s) => s.deadlines);
  const targetGpa = useDesk((s) => s.targetGpa);
  const hydrated = useDesk((s) => s.hydrated);

  useEffect(() => {
    if (!hydrated) setHydrated(true);
  }, [hydrated, setHydrated]);

  const gpa = projectedGpa(activity);
  const mastery = overallMastery(progress);
  const profile = useMemo(
    () => buildProfile(progress, activity, mistakes),
    [progress, activity, mistakes],
  );
  const focus = useMemo(
    () => recommendFocus(progress, mistakes),
    [progress, mistakes],
  );
  const upcoming = [...deadlines].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Main desk</p>
          <h1 className="mt-1 font-display text-4xl md:text-5xl">
            Good work, {scholarName}.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted">
            The Overseer watches the whole path. Accounting first. Finance later.
            Proof over intention.
          </p>
        </div>
        <label className="text-[11px] uppercase tracking-wider text-muted">
          Scholar name
          <input
            value={scholarName}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block h-11 w-full rounded-md border border-line bg-surface px-3 font-sans text-sm text-fg md:w-52"
          />
        </label>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="GPA trajectory"
          value={gpa === null ? "—" : gpa.toFixed(2)}
          hint={gpa === null ? "Sit a check to begin" : `Target ${targetGpa.toFixed(1)}`}
        />
        <Stat
          label="Desk mastery"
          value={`${Math.round(mastery * 100)}%`}
          hint="Across five chairs"
        />
        <Stat
          label="Pace"
          value={`${profile.speedMinutesPerChapter}m`}
          hint="Per finished chapter"
        />
        <Stat
          label="Streak"
          value={`${profile.streakDays}d`}
          hint={`Accuracy ${(profile.accuracy * 100).toFixed(0)}%`}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-line bg-surface p-5 shadow-panel">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Today’s recommended focus
            </p>
            <div className="mt-4 space-y-3">
              {focus.length === 0 ? (
                <p className="text-sm text-muted">Open Accounting chapter 1 to begin the spine.</p>
              ) : (
                focus.map((item) => (
                  <Link
                    key={`${item.subjectId}-${item.chapterId}`}
                    to="/subject/$id"
                    params={{ id: item.subjectId }}
                    search={{ chapter: item.chapterId }}
                    className="block rounded-lg border border-line bg-bg px-4 py-3 hover:bg-raised"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{item.title}</p>
                      <span className="text-[10px] uppercase tracking-wider text-sage">
                        {item.urgency}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{item.reason}</p>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5 shadow-panel">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Active subjects</p>
            <div className="mt-4 space-y-4">
              {SUBJECTS.map((s) => {
                const m = subjectMastery(progress, s.id);
                return (
                  <Link
                    key={s.id}
                    to="/subject/$id"
                    params={{ id: s.id }}
                    className="block"
                  >
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span>
                        {s.name}
                        <span className="ml-2 text-muted">{s.professor}</span>
                      </span>
                      <span className="tabular-nums text-muted">{Math.round(m * 100)}%</span>
                    </div>
                    <Progress value={m * 100} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-[420px]">
            <ProfessorChat subjectId="master" />
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Upcoming tests / deadlines
            </p>
            <ul className="mt-3 space-y-3">
              {upcoming.map((d) => (
                <li key={d.id} className="flex items-baseline justify-between gap-3 text-sm">
                  <span>{d.title}</span>
                  <span className="shrink-0 tabular-nums text-muted">{d.date}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/review"
              className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:text-fg"
            >
              Weekly review <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Strengths / leaks
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-sage">Strong</p>
                <p className="mt-1 text-muted">{profile.strengths.join(", ")}</p>
              </div>
              <div>
                <p className="text-amber">Watch</p>
                <p className="mt-1 text-muted">{profile.weaknesses.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-faint">{hint}</p>
    </div>
  );
}
