import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SUBJECTS } from "@/lib/curriculum";
import { cardsFromIntake } from "@/lib/exam-vault";
import { useDesk } from "@/lib/store";
import type { SubjectId } from "@/lib/types";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/ingest")({ component: IngestPage });

function IngestPage() {
  const ingest = useDesk((s) => s.ingest);
  const rememberCards = useDesk((s) => s.rememberCards);
  const notes = useDesk((s) => s.notes);
  const [subjectId, setSubjectId] = useState<SubjectId>("accounting");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [confusion, setConfusion] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Intake</p>
        <h1 className="mt-1 font-display text-4xl">Send the lecture here.</h1>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Paste a chapter name, slide notes, or the homework that is confusing. The chairs
          will keep it, file exam facts automatically, and the next chat will already know.
        </p>
      </header>

      <form
        className="space-y-4 rounded-xl border border-line bg-surface p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim() && !body.trim()) return;
          ingest({
            subjectId,
            title: title.trim() || "Untitled lecture",
            body: body.trim(),
            confusion: confusion.trim() || undefined,
          });
          rememberCards(
            cardsFromIntake({
              id: "tmp",
              at: Date.now(),
              subjectId,
              title: title.trim() || "Untitled lecture",
              body: body.trim(),
              confusion: confusion.trim() || undefined,
            }),
          );
          setTitle("");
          setBody("");
          setConfusion("");
          setSaved(true);
          window.setTimeout(() => setSaved(false), 1800);
        }}
      >
        <label className="block text-[11px] uppercase tracking-wider text-muted">
          Chair
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value as SubjectId)}
            className="mt-1 block h-11 w-full rounded-md border border-line bg-bg px-3 text-sm text-fg"
          >
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-[11px] uppercase tracking-wider text-muted">
          Topic / chapter
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block h-11 w-full rounded-md border border-line bg-bg px-3 text-sm"
            placeholder="Accounting I — Adjusting entries"
          />
        </label>
        <label className="block text-[11px] uppercase tracking-wider text-muted">
          Notes, slides, homework
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm"
            placeholder="Paste the lecture or the problem set here."
          />
        </label>
        <label className="block text-[11px] uppercase tracking-wider text-muted">
          What felt thin
          <textarea
            value={confusion}
            onChange={(e) => setConfusion(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm"
            placeholder="I keep mixing prepaid and unearned…"
          />
        </label>
        <Button type="submit">{saved ? "Filed" : "File on the desk"}</Button>
      </form>

      <section>
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Recent intake</p>
        <ul className="mt-3 space-y-3">
          {notes.length === 0 ? (
            <li className="text-sm text-muted">Nothing filed yet.</li>
          ) : (
            notes.map((n) => (
              <li key={n.id} className="rounded-xl border border-line bg-surface p-4">
                <p className="text-[10px] uppercase tracking-wider text-faint">{n.subjectId}</p>
                <p className="font-medium">{n.title}</p>
                <p className="mt-1 line-clamp-3 text-sm text-muted">{n.body}</p>
                {n.confusion ? (
                  <p className="mt-2 text-sm text-amber">Confusion: {n.confusion}</p>
                ) : null}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
