import { SUBJECTS } from "./curriculum";
import { chapterKey, subjectMastery } from "./store";
import type { Activity, ChapterProgress, Mistake, SkillProfile, SubjectId } from "./types";

export function scoreToGpa(score: number) {
  if (score >= 0.93) return 4.0;
  if (score >= 0.9) return 3.7;
  if (score >= 0.87) return 3.3;
  if (score >= 0.83) return 3.0;
  if (score >= 0.8) return 2.7;
  if (score >= 0.77) return 2.3;
  if (score >= 0.73) return 2.0;
  if (score >= 0.7) return 1.7;
  if (score >= 0.67) return 1.3;
  if (score >= 0.6) return 1.0;
  return 0;
}

export function projectedGpa(activity: Activity[]) {
  const quizzes = activity.filter((a) => a.kind === "quiz" && typeof a.score === "number");
  if (quizzes.length === 0) return null;
  const recent = quizzes.slice(0, 12);
  const avg = recent.reduce((s, a) => s + scoreToGpa(a.score ?? 0), 0) / recent.length;
  return Math.round(avg * 100) / 100;
}

export function overallMastery(progress: Record<string, ChapterProgress>) {
  const vals = SUBJECTS.map((s) => subjectMastery(progress, s.id));
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

export function buildProfile(
  progress: Record<string, ChapterProgress>,
  activity: Activity[],
  mistakes: Mistake[],
): SkillProfile {
  const quizzes = activity.filter((a) => a.kind === "quiz" && typeof a.score === "number");
  const accuracy =
    quizzes.length === 0
      ? 0
      : quizzes.slice(0, 20).reduce((s, a) => s + (a.score ?? 0), 0) / Math.min(20, quizzes.length);

  const finished = Object.values(progress).filter((p) => p.status === "mastered" || p.status === "practiced");
  const avgMin =
    finished.length === 0
      ? 40
      : finished.reduce((s, p) => s + p.minutes, 0) / finished.length;

  const tagHits = new Map<string, { wrong: number; total: number }>();
  for (const m of mistakes.slice(0, 80)) {
    for (const t of m.tags) {
      const cur = tagHits.get(t) ?? { wrong: 0, total: 0 };
      cur.wrong += 1;
      cur.total += 1;
      tagHits.set(t, cur);
    }
  }
  for (const a of quizzes) {
    if (!a.chapterId) continue;
    const sub = SUBJECTS.find((s) => s.id === a.subjectId);
    const ch = sub?.chapters.find((c) => c.id === a.chapterId);
    if (!ch) continue;
    const tags = new Set(ch.quiz.flatMap((q) => q.tags));
    for (const t of tags) {
      const cur = tagHits.get(t) ?? { wrong: 0, total: 0 };
      cur.total += 1;
      tagHits.set(t, cur);
    }
  }

  const ranked = [...tagHits.entries()]
    .filter(([, v]) => v.total >= 1)
    .map(([tag, v]) => ({ tag, rate: v.wrong / Math.max(1, v.total) }))
    .sort((a, b) => b.rate - a.rate);

  const weaknesses = ranked.filter((r) => r.rate >= 0.35).slice(0, 4).map((r) => r.tag);
  const strengths = ranked
    .filter((r) => r.rate <= 0.2)
    .slice(-4)
    .reverse()
    .map((r) => r.tag);

  const days = new Set(
    activity.map((a) => new Date(a.at).toISOString().slice(0, 10)),
  );
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (days.has(key)) streak += 1;
    else if (i > 0) break;
  }

  return {
    speedMinutesPerChapter: Math.round(avgMin),
    accuracy,
    strengths: strengths.length ? strengths : ["consistency pending"],
    weaknesses: weaknesses.length ? weaknesses : ["not enough quiz data"],
    streakDays: streak,
  };
}

export type FocusItem = {
  subjectId: SubjectId;
  chapterId: string;
  title: string;
  reason: string;
  urgency: "now" | "soon" | "later";
};

export function recommendFocus(
  progress: Record<string, ChapterProgress>,
  mistakes: Mistake[],
): FocusItem[] {
  const out: FocusItem[] = [];

  const recentMiss = mistakes[0];
  if (recentMiss) {
    const sub = SUBJECTS.find((s) => s.id === recentMiss.subjectId);
    const ch = sub?.chapters.find((c) => c.id === recentMiss.chapterId);
    if (sub && ch) {
      out.push({
        subjectId: sub.id,
        chapterId: ch.id,
        title: `${sub.name}: ${ch.title}`,
        reason: "A recent miss is still warm. Repair it before it hardens.",
        urgency: "now",
      });
    }
  }

  for (const subject of SUBJECTS) {
    for (const ch of subject.chapters) {
      const p = progress[chapterKey(subject.id, ch.id)];
      if (p?.status === "learning" || p?.status === "practiced") {
        if (p.lastScore !== null && p.lastScore < 0.85) {
          out.push({
            subjectId: subject.id,
            chapterId: ch.id,
            title: `${subject.name}: ${ch.title}`,
            reason: `Last check ${(p.lastScore * 100).toFixed(0)}%. Mastery wants 85%+.`,
            urgency: "now",
          });
        } else if (p.status === "learning") {
          out.push({
            subjectId: subject.id,
            chapterId: ch.id,
            title: `${subject.name}: ${ch.title}`,
            reason: "Opened but unfinished. Close the loop with practice, then a check.",
            urgency: "soon",
          });
        }
      }
    }
  }

  const accounting = SUBJECTS.find((s) => s.id === "accounting");
  if (accounting) {
    const next = accounting.chapters.find((ch) => {
      const p = progress[chapterKey("accounting", ch.id)];
      return !p || p.status === "not_started";
    });
    if (next) {
      out.push({
        subjectId: "accounting",
        chapterId: next.id,
        title: `Accounting: ${next.title}`,
        reason: "Priority path. This is the next unopened chapter on the Northland spine.",
        urgency: out.length ? "soon" : "now",
      });
    }
  }

  const seen = new Set<string>();
  return out.filter((item) => {
    const k = `${item.subjectId}:${item.chapterId}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, 4);
}

export function weeklyReview(
  activity: Activity[],
  progress: Record<string, ChapterProgress>,
  profile: SkillProfile,
) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const week = activity.filter((a) => a.at >= weekAgo);
  const minutes = week.reduce((s, a) => s + a.minutes, 0);
  const quizzes = week.filter((a) => a.kind === "quiz");
  const avg =
    quizzes.length === 0
      ? null
      : quizzes.reduce((s, a) => s + (a.score ?? 0), 0) / quizzes.length;
  const started = Object.values(progress).filter((p) => p.status !== "not_started").length;
  const mastered = Object.values(progress).filter((p) => p.status === "mastered").length;

  const lines = [
    `You logged ${minutes} focused minutes across ${week.length} sessions this week.`,
    quizzes.length
      ? `Quiz average ${(avg! * 100).toFixed(0)}% on ${quizzes.length} checks.`
      : "No mastery checks this week. The Master Professor will keep you in the notes until you prove it.",
    `${mastered} chapters mastered, ${started} in motion.`,
    profile.weaknesses[0] && profile.weaknesses[0] !== "not enough quiz data"
      ? `Primary leak: ${profile.weaknesses.join(", ")}. We drill those before new volume.`
      : "Not enough tagged errors yet — the next two quizzes will map your weak points.",
    minutes < 180
      ? "Adjustment: protect the weekday 1:30–5:30 block. Four honest hours beats weekend heroics."
      : "Cadence is real. Keep the same hours. Do not add subjects until Accounting stays above 70% mastery.",
  ];

  return { minutes, quizzes: quizzes.length, avg, lines };
}
