import { createServerFn } from "@tanstack/react-start";
import { parseExamBlock } from "./exam-vault";
import { professorSystemPrompt } from "./professor";
import type { SkillProfile, SubjectId } from "./types";

export type AskInput = {
  subjectId: SubjectId | "master";
  chapterId?: string;
  scholarName: string;
  profile: SkillProfile;
  question: string;
  history: { role: "user" | "professor"; text: string }[];
  confusion?: string;
  ingested?: string;
  examMemory?: string;
};

export const askProfessor = createServerFn({ method: "POST" })
  .validator((input: AskInput) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "offline" as const };
    }

    const system = professorSystemPrompt(data);
    const messages = [
      { role: "system" as const, content: system },
      ...data.history.slice(-8).map((m) => ({
        role: (m.role === "professor" ? "assistant" : "user") as "assistant" | "user",
        content: m.text,
      })),
      { role: "user" as const, content: data.question },
    ];

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          messages,
          max_tokens: 900,
          temperature: 0.35,
        }),
      });
      if (!res.ok) {
        return { ok: false as const, error: `xAI ${res.status}` };
      }
      const body = (await res.json()) as {
        choices: { message: { content: string } }[];
      };
      const raw = body.choices[0]?.message.content ?? "";
      const parsed = parseExamBlock(raw);
      return { ok: true as const, text: parsed.text, extracts: parsed.cards };
    } catch {
      return { ok: false as const, error: "network" };
    }
  });
