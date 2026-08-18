import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Inbox, LayoutDashboard, ScrollText, Layers } from "lucide-react";
import { SUBJECTS } from "@/lib/curriculum";
import { cn } from "@/lib/cn";

const nav = [
  { to: "/", label: "Desk", icon: LayoutDashboard },
  { to: "/exam", label: "Exams", icon: Layers },
  { to: "/ingest", label: "Intake", icon: Inbox },
  { to: "/review", label: "Review", icon: ScrollText },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto flex min-h-dvh max-w-7xl">
        <aside className="hidden w-60 shrink-0 flex-col border-r border-line px-4 py-6 md:flex">
          <Link to="/" className="mb-8 block px-2">
            <p className="font-display text-xl leading-none">Atrium</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted">
              Learning Desk
            </p>
          </Link>
          <nav className="flex flex-col gap-1">
            {nav.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-11 items-center gap-2 rounded-md px-3 text-sm",
                    active ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <p className="mt-8 mb-2 px-3 text-[10px] uppercase tracking-[0.16em] text-faint">
            Chairs
          </p>
          <nav className="flex flex-col gap-1">
            {SUBJECTS.map((s) => {
              const to = `/subject/${s.id}`;
              const active = pathname === to;
              return (
                <Link
                  key={s.id}
                  to="/subject/$id"
                  params={{ id: s.id }}
                  className={cn(
                    "flex h-11 items-center justify-between rounded-md px-3 text-sm",
                    active ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg",
                  )}
                >
                  <span>{s.name}</span>
                  {s.id === "accounting" ? (
                    <span className="text-[10px] uppercase tracking-wider text-sage">
                      Focus
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto px-2 pt-8 text-[11px] leading-relaxed text-faint">
            Private atelier. Mastery before volume.
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-line px-4 py-3 md:hidden">
            <div>
              <p className="font-display text-lg">Atrium</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                Learning Desk
              </p>
            </div>
            <BookOpen className="size-5 text-muted" />
          </header>
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
          <nav className="sticky bottom-0 grid grid-cols-5 border-t border-line bg-bg/95 backdrop-blur md:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-wider",
                  pathname === item.to ? "text-fg" : "text-muted",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
            <Link
              to="/subject/$id"
              params={{ id: "accounting" }}
              className={cn(
                "flex h-14 flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-wider",
                pathname.startsWith("/subject") ? "text-fg" : "text-muted",
              )}
            >
              <BookOpen className="size-4" />
              Chairs
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
