export type SubjectId =
  | "accounting"
  | "business"
  | "finance"
  | "economics"
  | "quant";

export type MasteryStatus =
  | "not_started"
  | "learning"
  | "practiced"
  | "mastered";

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
  tags: string[];
};

export type PracticeItem = {
  id: string;
  prompt: string;
  hint: string;
  solution: string;
};

export type Chapter = {
  id: string;
  title: string;
  minutes: number;
  objective: string;
  simple: string;
  notes: string[];
  pitfalls: string[];
  formulas: string[];
  practice: PracticeItem[];
  quiz: QuizQuestion[];
};

export type Subject = {
  id: SubjectId;
  name: string;
  short: string;
  professor: string;
  title: string;
  voice: string;
  priority: number;
  blurb: string;
  chapters: Chapter[];
};

export type Deadline = {
  id: string;
  subjectId: SubjectId;
  title: string;
  date: string;
};

export type Mistake = {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  question: string;
  yourAnswer: string;
  correct: string;
  at: number;
  tags: string[];
};

export type Activity = {
  id: string;
  at: number;
  kind: "study" | "practice" | "quiz" | "chat" | "ingest";
  subjectId: SubjectId;
  chapterId?: string;
  minutes: number;
  score?: number;
};

export type IngestedNote = {
  id: string;
  at: number;
  subjectId: SubjectId;
  title: string;
  body: string;
  confusion?: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "professor";
  text: string;
  at: number;
};

export type ChapterProgress = {
  status: MasteryStatus;
  lastScore: number | null;
  attempts: number;
  practiceDone: string[];
  minutes: number;
};

export type SkillProfile = {
  speedMinutesPerChapter: number;
  accuracy: number;
  strengths: string[];
  weaknesses: string[];
  streakDays: number;
};
