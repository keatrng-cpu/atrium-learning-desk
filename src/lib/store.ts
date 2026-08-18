import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEFAULT_DEADLINES, SUBJECTS, getChapter } from "./curriculum";
import { cardsFromMisses, mergeCards, reviewAdvance, seedCurriculumCards } from "./exam-vault";
import type {
  Activity,
  ChapterProgress,
  ChatMessage,
  Deadline,
  ExamCard,
  IngestedNote,
  MasteryStatus,
  Mistake,
  SubjectId,
} from "./types";

type ChapterKey = string;

function ck(subjectId: string, chapterId: string): ChapterKey {
  return `${subjectId}:${chapterId}`;
}

export type DeskState = {
  scholarName: string;
  targetGpa: number;
  hydrated: boolean;
  progress: Record<ChapterKey, ChapterProgress>;
  mistakes: Mistake[];
  activity: Activity[];
  notes: IngestedNote[];
  chats: Record<string, ChatMessage[]>;
  deadlines: Deadline[];
  examCards: ExamCard[];
  lastVisit: number | null;
  setName: (name: string) => void;
  setHydrated: (v: boolean) => void;
  markLearning: (subjectId: SubjectId, chapterId: string, minutes?: number) => void;
  markPractice: (subjectId: SubjectId, chapterId: string, practiceId: string) => void;
  recordQuiz: (input: {
    subjectId: SubjectId;
    chapterId: string;
    score: number;
    minutes: number;
    misses: Omit<Mistake, "id" | "at">[];
  }) => void;
  addMinutes: (subjectId: SubjectId, chapterId: string, minutes: number) => void;
  logActivity: (a: Omit<Activity, "id" | "at"> & { at?: number }) => void;
  ingest: (n: Omit<IngestedNote, "id" | "at">) => void;
  pushChat: (key: string, msg: Omit<ChatMessage, "id" | "at">) => void;
  addDeadline: (d: Omit<Deadline, "id">) => void;
  rememberCards: (cards: ExamCard[]) => void;
  reviewExamCard: (id: string, knew: boolean) => void;
  seedExamIfEmpty: () => void;
  resetDesk: () => void;
};

const emptyProgress = (): ChapterProgress => ({
  status: "not_started",
  lastScore: null,
  attempts: 0,
  practiceDone: [],
  minutes: 0,
});

function bumpStatus(current: MasteryStatus, next: MasteryStatus): MasteryStatus {
  const order: MasteryStatus[] = ["not_started", "learning", "practiced", "mastered"];
  return order.indexOf(next) > order.indexOf(current) ? next : current;
}

export const useDesk = create<DeskState>()(
  persist(
    (set, get) => ({
      scholarName: "Scholar",
      targetGpa: 3.7,
      hydrated: false,
      progress: {},
      mistakes: [],
      activity: [],
      notes: [],
      chats: {},
      deadlines: DEFAULT_DEADLINES,
      examCards: [],
      lastVisit: null,
      setName: (scholarName) => set({ scholarName }),
      setHydrated: (hydrated) => set({ hydrated }),
      markLearning: (subjectId, chapterId, minutes = 8) => {
        const key = ck(subjectId, chapterId);
        const prev = get().progress[key] ?? emptyProgress();
        set({
          progress: {
            ...get().progress,
            [key]: {
              ...prev,
              status: bumpStatus(prev.status, "learning"),
              minutes: prev.minutes + minutes,
            },
          },
        });
        get().logActivity({ subjectId, chapterId, kind: "study", minutes });
      },
      markPractice: (subjectId, chapterId, practiceId) => {
        const key = ck(subjectId, chapterId);
        const prev = get().progress[key] ?? emptyProgress();
        const practiceDone = prev.practiceDone.includes(practiceId)
          ? prev.practiceDone
          : [...prev.practiceDone, practiceId];
        const chapter = getChapter(subjectId, chapterId);
        const allDone = chapter
          ? chapter.practice.every((p) => practiceDone.includes(p.id))
          : practiceDone.length > 0;
        set({
          progress: {
            ...get().progress,
            [key]: {
              ...prev,
              practiceDone,
              status: allDone
                ? bumpStatus(prev.status, "practiced")
                : bumpStatus(prev.status, "learning"),
              minutes: prev.minutes + 6,
            },
          },
        });
        get().logActivity({ subjectId, chapterId, kind: "practice", minutes: 6 });
      },
      recordQuiz: ({ subjectId, chapterId, score, minutes, misses }) => {
        const key = ck(subjectId, chapterId);
        const prev = get().progress[key] ?? emptyProgress();
        const mastered = score >= 0.85;
        const nextStatus: MasteryStatus = mastered
          ? "mastered"
          : score >= 0.6
            ? bumpStatus(prev.status, "practiced")
            : bumpStatus(prev.status, "learning");
        const stamp = Date.now();
        set({
          progress: {
            ...get().progress,
            [key]: {
              ...prev,
              lastScore: score,
              attempts: prev.attempts + 1,
              status: nextStatus,
              minutes: prev.minutes + minutes,
            },
          },
          mistakes: [
            ...misses.map((m, i) => ({
              ...m,
              id: `m-${stamp}-${i}`,
              at: stamp,
            })),
            ...get().mistakes,
          ].slice(0, 200),
        });
        get().logActivity({
          subjectId,
          chapterId,
          kind: "quiz",
          minutes,
          score,
        });
        if (misses.length) {
          get().rememberCards(
            cardsFromMisses(
              misses.map((m, i) => ({
                ...m,
                id: `m-${stamp}-${i}`,
                at: stamp,
              })),
            ),
          );
        }
      },
      addMinutes: (subjectId, chapterId, minutes) => {
        const key = ck(subjectId, chapterId);
        const prev = get().progress[key] ?? emptyProgress();
        set({
          progress: {
            ...get().progress,
            [key]: { ...prev, minutes: prev.minutes + minutes },
          },
        });
      },
      logActivity: (a) => {
        const item: Activity = {
          id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          at: a.at ?? Date.now(),
          kind: a.kind,
          subjectId: a.subjectId,
          chapterId: a.chapterId,
          minutes: a.minutes,
          score: a.score,
        };
        set({ activity: [item, ...get().activity].slice(0, 400), lastVisit: Date.now() });
      },
      ingest: (n) => {
        const note: IngestedNote = {
          ...n,
          id: `n-${Date.now()}`,
          at: Date.now(),
        };
        set({ notes: [note, ...get().notes].slice(0, 80) });
        get().logActivity({ subjectId: n.subjectId, kind: "ingest", minutes: 5 });
      },
      pushChat: (key, msg) => {
        const chats = get().chats;
        const next: ChatMessage = {
          ...msg,
          id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          at: Date.now(),
        };
        set({ chats: { ...chats, [key]: [...(chats[key] ?? []), next].slice(-80) } });
      },
      addDeadline: (d) => {
        set({
          deadlines: [...get().deadlines, { ...d, id: `dl-${Date.now()}` }],
        });
      },
      rememberCards: (cards) => {
        if (!cards.length) return;
        set({ examCards: mergeCards(get().examCards ?? [], cards) });
      },
      reviewExamCard: (id, knew) => {
        set({
          examCards: (get().examCards ?? []).map((c) =>
            c.id === id ? reviewAdvance(c, knew) : c,
          ),
        });
      },
      seedExamIfEmpty: () => {
        if ((get().examCards ?? []).length > 0) return;
        set({ examCards: seedCurriculumCards() });
      },
      resetDesk: () =>
        set({
          progress: {},
          mistakes: [],
          activity: [],
          notes: [],
          chats: {},
          deadlines: DEFAULT_DEADLINES,
          examCards: seedCurriculumCards(),
        }),
    }),
    {
      name: "atrium-learning-desk-v1",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      partialize: (s) => ({
        scholarName: s.scholarName,
        targetGpa: s.targetGpa,
        progress: s.progress,
        mistakes: s.mistakes,
        activity: s.activity,
        notes: s.notes,
        chats: s.chats,
        deadlines: s.deadlines,
        examCards: s.examCards,
        lastVisit: s.lastVisit,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

export function chapterKey(subjectId: string, chapterId: string) {
  return ck(subjectId, chapterId);
}

export function subjectMastery(progress: Record<string, ChapterProgress>, subjectId: SubjectId) {
  const subject = SUBJECTS.find((s) => s.id === subjectId);
  if (!subject || subject.chapters.length === 0) return 0;
  const weights: Record<MasteryStatus, number> = {
    not_started: 0,
    learning: 0.35,
    practiced: 0.7,
    mastered: 1,
  };
  const sum = subject.chapters.reduce((acc, ch) => {
    const p = progress[ck(subjectId, ch.id)];
    return acc + weights[p?.status ?? "not_started"];
  }, 0);
  return sum / subject.chapters.length;
}
