# AGENTS.md — reference sections (moved verbatim)

_Moved out of `AGENTS.md` by Forge Atlas Wave 1 (M2 canon trim) so agents load the rules first and open detail on demand. Content unchanged. Rules, gates and floors stayed in `AGENTS.md`._

## 1. Your environment / workspace (for you, never surfaced to the user)

### Where you are

| Item | Value |
| --- | --- |
| Working directory | `/workspace` (project root) |
| OS | Linux container, **Node 22** (not the user's OS) |
| App must listen on | **`0.0.0.0:8080`** — how the live preview finds your app |
| How you check the app | `http://127.0.0.1:8080` **from inside this container** (curl / browser tools / Playwright) |
| How the **user** sees the app | Live preview in the **web client** (automatic once something serves on 8080) — not a URL you invent for them |
| Auth / CLI | `grok` + credentials injected for you |
| Persistence | Sandbox may be **stopped, restarted, or replaced**; `/workspace` is your app state for this run |
| Process restart contract | **`/workspace/startup.sh`** — you own this file; the platform re-runs it after hibernate/revive |

**Why `0.0.0.0:8080` matters:** the preview proxy auto-discovers your dev server
by probing common ports and prefers a server bound on **all interfaces**.
Binding `0.0.0.0:8080` makes your app the reliable preview pick. Don't bind
loopback-only, and don't pick another port unless you truly must.

### `/workspace/startup.sh` (required — you maintain this)

> Rule section, kept in canon: see [AGENTS.md#workspacestartupsh-required--you-maintain-this](../../AGENTS.md#workspacestartupsh-required--you-maintain-this).

### What is already here

- **`package.json`** + **`node_modules/`** — deps **preinstalled**. Avoid
  `npm install` unless you truly need a new package. The full inventory in
  `package.json` is fair game (`date-fns`, `tw-animate-css`,
  `class-variance-authority`, `@tanstack/react-table`, …) — check it before
  assuming something is missing.
- **Playwright + Chromium** — installed for **you** to open and exercise the
  running app (see §3).
- **`screenshots/`** — write agent QA screenshots here (never under `/tmp`).
- **`vite.config.ts` + `tsconfig.json`** — preconfigured (preview port
  contract, Vercel build preset, strict TS with `@/*` → `src/*`). Edit if you
  must, but keep the port, the build-gated nitro plugin (see §"Build &
  deploy target"), and the Grok PWA plugin (`grokPwaPlugin`).
- **`public/__grok/`, `server/`, and `scripts/grok-pwa-*`** — platform Add to
  Home Screen chrome (template icon, install page + assets, the Vite plugin,
  and the Nitro middleware that serves it on deployed apps). Do not delete or
  overwrite any of them. `?install=1&platform=ios` shows the install tutorial,
  not app UI; if you add your own server routes, put them in `src/routes/`,
  never in `server/`.
- **No app routes/UI yet** — only the pre-wired `src/lib` data/auth helpers
  (see "Data & auth") and `src/lib/error-component.tsx` (the router's
  `defaultErrorComponent`); build the app around them, don't delete them.
  `npm run dev` errors until you create the entry files — start from
  §"First scaffold" below.
- **Port contract** — `npm run dev` binds **`0.0.0.0:8080`**. Prefer 8080 over
  5173/3000 so the preview reliably picks your app.

### What you can / cannot install

| Allowed | Not available |
| --- | --- |
| `npm install` / `npm i` for **JS packages** (registry works). Prefer packages already in `package.json` when possible. | **`apt` / `apt-get` / `yum` / system package managers** — do not try; they will not work here |
| Node 22, Playwright Chromium (for your QA), preinstalled app deps | OS-level libs, compilers, or native toolchains via the shell |
| Docs / web search for APIs and how-tos | Trial-and-error install loops when something is missing — search first, then use an npm or pure-browser approach |

- Need a JS dependency (including game engines like `three` / Phaser) → **npm**
  and leave it in `package.json` for deploy.
- Dependency install scripts (`preinstall` / `postinstall`) are off by default, so
  `npm install` never runs a package's own code. `npm run dev|build|typecheck`
  are unaffected. If a package needs its postinstall — a native module that
  compiles or downloads a binary, e.g. `better-sqlite3` — install it once with
  `GROK_ALLOW_INSTALL_SCRIPTS=1 npm install <pkg>`. Prefer a pure-JS alternative.
- Prefer pure browser / Node / already-baked deps over anything that needs a
  system package.

### First scaffold — required entry files

> Rule section, kept in canon: see [AGENTS.md#first-scaffold--required-entry-files](../../AGENTS.md#first-scaffold--required-entry-files).

### Stack (high level)

React 19, TypeScript, Vite 8, TanStack Start / Router / Query / Table, Tailwind
v4, core Radix set, zustand, zod + react-hook-form, lucide, sonner, cmdk, vaul,
recharts. Data + auth: Postgres (`pg` + PGLite fallback) + self-hosted Better
Auth federated to the shared Grok auth broker (Google, X; plus optional local
email/password), pre-wired in `src/lib` — see "Data & auth" below.

### Data & auth

Postgres + authentication are **preinstalled** and pre-wired in `src/lib`
(don't reinstall). The **DB** is dual-mode: real **Neon** when `DATABASE_URL` is
set, else a local **PGLite** fallback, so the preview always renders. **Auth is
real and ON by default even in the live preview** — it federates via a baked
shared preview client — so build real sign-in; do **NOT** scaffold demo/mock
users. Full guides + snippets: the **`neon` skill** (database) and the
**`auth` skill** (sign-in), under `.grok/skills/`.

- **DB (server-only):** `const sql = await getSql()` from `@/lib/db` — a **regular
  Postgres driver** (node-postgres, `pg`) when `DATABASE_URL` is set, else a local
  **PGLite** fallback. Use only in `createServerFn` / server loaders. In preview,
  PGLite **bootstraps at server start** (`ensureDbReady`) — do not remove that.
- **Security (per-user data):** authorize every server function with
  `authMiddleware` (`@/lib/auth/middleware`):
  `createServerFn().middleware([authMiddleware])` hands the handler a
  **verified** `context.userId` (resolved from the same-origin session; throws
  when signed out). Scope **every** query by that `user_id`. Never trust a
  client-sent id.
- **Migrations:** `migrations/*.sql` are the single schema source — applied to
  **Neon on deploy** (`npm run build` runs them, so Vercel ships with the schema
  ready) and to the **PGLite** preview automatically on startup. `0001_auth.sql`
  is the Better Auth schema (don't edit); add your app's tables as ordered files
  (`migrations/0002_*.sql`), not inline.
- **Auth:** this app runs its own Better Auth at `/api/auth/*` and federates to
  the shared Grok auth broker for **Google** and **X**. The only other supported
  method is this app's own **email/password** (local Better Auth, off by default —
  enable only via `src/lib/auth/email-password.ts`; **never rewrite**
  `src/lib/auth/server.ts`); no other methods are supported (no other social
  providers, magic links, passkeys, OTP/phone). Add two routes — the API route
  `src/routes/api/auth/$.ts` and a sign-in page. The live-preview popup path
  `/auth/popup` is already handled by the Vite plugin — **never** add a React
  route for it. Then read the user via `useCurrentUser()`
  (`@/lib/auth/use-current-user`) and gate UI with `SignedIn` / `SignedOut` /
  `UserButton` (`@/lib/auth/gates`). See the **`auth` skill**. Real sign-in
  works in preview, so a visitor is signed out until they sign in — don't fake
  a user.
- **Env:** do **not** create a `.env` file. Live preview needs none — auth uses
  the baked preview client and the DB falls back to PGLite. On deploy the
  platform injects `DATABASE_URL` + per-app auth creds. Set
  `VITE_AUTH_ENABLED=false` only to turn sign-in OFF. Never expose server-only
  vars to the client (only `VITE_`-prefixed reach the browser).
- **AI features (chat, images, video, voice):** when `XAI_API_KEY` is in the
  env, the app has real xAI API access (server-only; latest model `grok-4.5`,
  docs at [docs.x.ai](https://docs.x.ai)) — chat/LLM **plus Imagine
  (image/video generation) and Voice (text-to-speech)** at runtime. The key
  spends the **app owner's quota** — keep calls user-initiated and capped.
  See the **`xai-api` skill** (`.grok/skills/xai-api/SKILL.md`) before
  building any AI feature. Don't mock AI responses or use another provider.

### Build & deploy target

> Rule section, kept in canon: see [AGENTS.md#build--deploy-target](../../AGENTS.md#build--deploy-target).

---

## 3. What might happen & how to execute

### Lifecycle

- Usually a **fresh** `/workspace` (template + `node_modules` only).
  **`/workspace/startup.sh` is not pre-seeded** — you create it.
- The sandbox is kept up so the user can use the **live preview** — **leave
  the app processes running** when you finish (dev server on `:8080`).
- **Hibernate / revive:** if the sandbox is snapshotted and restored, the
  platform re-runs **`/workspace/startup.sh`** (if present). Your job on every
  turn is to ensure that file exists and still starts whatever the preview needs.
- **Follow-up turns (multi-turn continuity):** when the preview is already
  running, **edit in place** — don't kill the dev server or re-scaffold unless
  truly necessary (e.g. files were wiped, or the change is too big to patch
  cleanly). Vite HMR pushes source edits to the preview instantly; restart the
  server **only** for `vite.config` / dependency changes (and update
  `startup.sh` if the restart command changes). Killing the server blanks the
  user's preview mid-session.
- A **reboot / recreate** may wipe app files back to the template; re-scaffold
  if needed and **restore `startup.sh`** before verifying the preview.
- Headless loop: no user in your TTY. Do **not** block on questions they can't
  answer from the chat UI alone (ports, paths, shell output, screenshots from
  *your* tools).

### Parallel work (subagents / multiple agents)

When you split work across subagents or parallel tasks on **one** app:

1. **Establish the shared contract first** (routes, main data types, design
   tokens / layout shell, package deps) in the main agent or a first sequential
   step — **before** parallel writes.
2. Assign **non-overlapping surfaces** (e.g. page A vs page B, or data layer vs
   one feature UI) so agents don’t invent competing schemas or duplicate
   components. The brand-asset pass — og card, favicon, PWA icons per
   `.grok/skills/og/SKILL.md` — is a canonical parallel surface: it only
   needs the name and palette, and only writes `public/` + a few head lines.
3. Do **not** launch several agents that each invent their own API shapes,
   folder layout, or visual system for the same product.
4. After parallel work: integrate, fix conflicts, and verify one coherent app.

If the shared contract isn’t ready, stay sequential.

### Execution loop (default)

1. Interpret the (possibly one-line) ask into one concrete app.
2. Scaffold TanStack Start + implement for real — working UI + state, not wireframes.
   For **any** WASD / vehicle / flight: open **`.grok/skills/controls/SKILL.md`**
   **before** writing movement (A must turn left under a chase cam; do not rely on
   genre files alone).
3. Ensure **`/workspace/startup.sh`** starts the app (edit if needed), then
   run `sh /workspace/startup.sh` (or the same commands) so the dev server is
   up in the background; leave it up.
4. **Verify yourself, before the user sees it** — the preview shows whatever you
   produce, and the user uses web preview, not your localhost:
   - At least **HTTP:** `curl -sf http://127.0.0.1:8080/`.
   - Prefer also loading the page in a **browser tool / Playwright** and looking
     at it.
   - **Games with movement:** a still frame is not enough — confirm **A = left /
     D = right** while moving forward (see `controls` skill self-test). Flip one
     steer/roll sign if inverted; retest.
5. Fix blank pages, console errors, broken layout, and inverted controls.
6. Give a brief, **user-facing** summary — what you built and what to try in the
   preview. **Never** "please open localhost and tell me if it works" or "run this
   on your machine."

### Browser QA (agent-driven only; the user is not your QA)

> Rule section, kept in canon: see [AGENTS.md#browser-qa-agent-driven-only-the-user-is-not-your-qa](../../AGENTS.md#browser-qa-agent-driven-only-the-user-is-not-your-qa).

### Communication rules (avoid confusing the user)

> Rule section, kept in canon: see [AGENTS.md#communication-rules-avoid-confusing-the-user](../../AGENTS.md#communication-rules-avoid-confusing-the-user).

### Quality bar

> Rule section, kept in canon: see [AGENTS.md#quality-bar](../../AGENTS.md#quality-bar).

---

