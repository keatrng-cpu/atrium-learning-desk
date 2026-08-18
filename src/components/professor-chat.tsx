import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { askProfessor } from "@/lib/ai";
import { cardsFromExtracts, localExtractCards } from "@/lib/exam-vault";
import { localProfessorReply, seedGreeting } from "@/lib/professor";
import { useDesk } from "@/lib/store";
import { buildProfile } from "@/lib/mastery";
import type { SubjectId } from "@/lib/types";
import { Button } from "./ui/button";

export function ProfessorChat({
  subjectId,
  chapterId,
  compact,
}: {
  subjectId: SubjectId | "master";
  chapterId?: string;
  compact?: boolean;
}) {
  const scholarName = useDesk((s) => s.scholarName);
  const progress = useDesk((s) => s.progress);
  const activity = useDesk((s) => s.activity);
  const mistakes = useDesk((s) => s.mistakes);
  const notes = useDesk((s) => s.notes);
  const chats = useDesk((s) => s.chats);
  const examCards = useDesk((s) => s.examCards);
  const pushChat = useDesk((s) => s.pushChat);
  const logActivity = useDesk((s) => s.logActivity);
  const rememberCards = useDesk((s) => s.rememberCards);

  const key = chapterId ? `${subjectId}:${chapterId}` : subjectId;
  const profile = useMemo(
    () => buildProfile(progress, activity, mistakes),
    [progress, activity, mistakes],
  );
  const history = chats[key] ?? [];
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  const examMemory = useMemo(() => {
    return (examCards ?? [])
      .filter((c) => subjectId === "master" || c.subjectId === subjectId)
      .slice(0, 12)
      .map((c) => `- [${c.scope}] ${c.front} → ${c.back}`)
      .join("\n");
  }, [examCards, subjectId]);

  useEffect(() => {
    if (history.length === 0) {
      const greet = seedGreeting(subjectId, scholarName);
      pushChat(key, { role: greet.role, text: greet.text });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [history.length, busy]);

  async function send() {
    const q = text.trim();
    if (!q || busy) return;
    setText("");
    pushChat(key, { role: "user", text: q });
    setBusy(true);
    const ingested = notes
      .filter((n) => subjectId === "master" || n.subjectId === subjectId)
      .slice(0, 2)
      .map((n) => `${n.title}: ${n.body}${n.confusion ? `\nConfusion: ${n.confusion}` : ""}`)
      .join("\n\n");

    try {
      const res = await askProfessor({
        data: {
          subjectId,
          chapterId,
          scholarName,
          profile,
          question: q,
          history: [...history, { role: "user", text: q }],
          ingested: ingested || undefined,
          examMemory: examMemory || undefined,
        },
      });
      const reply =
        res.ok && res.text
          ? res.text
          : localProfessorReply(q, subjectId, chapterId, profile);
      pushChat(key, { role: "professor", text: reply });

      const sid = subjectId === "master" ? "accounting" : subjectId;
      const fromModel =
        res.ok && "extracts" in res && res.extracts
          ? cardsFromExtracts(
              res.extracts.map((e) => ({
                ...e,
                subjectId: e.subjectId || sid,
                chapterId: e.chapterId ?? chapterId,
                source: "chat" as const,
              })),
            )
          : [];
      const fallback = localExtractCards(q, reply, subjectId, chapterId);
      const incoming = fromModel.length ? fromModel : fallback;
      if (incoming.length) {
        rememberCards(incoming);
        setSavedCount(incoming.length);
      }
    } catch {
      const reply = localProfessorReply(q, subjectId, chapterId, profile);
      pushChat(key, { role: "professor", text: reply });
      const incoming = localExtractCards(q, reply, subjectId, chapterId);
      if (incoming.length) {
        rememberCards(incoming);
        setSavedCount(incoming.length);
      }
    } finally {
      if (subjectId !== "master") {
        logActivity({ subjectId, chapterId, kind: "chat", minutes: 3 });
      } else {
        logActivity({ subjectId: "accounting", kind: "chat", minutes: 2 });
      }
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-line bg-surface shadow-panel">
      <div className="border-b border-line px-4 py-3">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
          {subjectId === "master" ? "Master Professor" : "Chair"}
        </p>
        <p className="font-display text-lg">
          {subjectId === "master" ? "The Overseer" : "Subject desk"}
        </p>
        {savedCount > 0 ? (
          <p className="mt-1 text-[11px] text-sage">
            {savedCount} exam fact{savedCount === 1 ? "" : "s"} filed for unit tests / finals
          </p>
        ) : null}
      </div>
      <div
        ref={scroller}
        className={compact ? "max-h-72 space-y-3 overflow-y-auto px-4 py-3" : "min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3"}
      >
        {history.map((m) => (
          <div
            key={m.id}
            className={m.role === "user" ? "ml-8 text-right" : "mr-6"}
          >
            <p className="mb-1 text-[10px] uppercase tracking-wider text-faint">
              {m.role === "user" ? scholarName : "Professor"}
            </p>
            <div
              className={
                m.role === "user"
                  ? "inline-block rounded-lg bg-raised px-3 py-2 text-left text-sm"
                  : "text-sm leading-relaxed text-fg/90 whitespace-pre-wrap"
              }
            >
              {m.text}
            </div>
          </div>
        ))}
        {busy ? (
          <p className="text-sm text-muted">The chair is writing…</p>
        ) : null}
      </div>
      <form
        className="flex gap-2 border-t border-line p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask, or say “save this for the final”"
          className="h-11 min-w-0 flex-1 rounded-md border border-line bg-bg px-3 text-sm outline-none ring-accent/30 placeholder:text-faint focus:ring-2"
        />
        <Button type="submit" size="icon" disabled={busy || !text.trim()} aria-label="Send">
          <ArrowUp className="size-4" />
        </Button>
      </form>
    </div>
  );
}
