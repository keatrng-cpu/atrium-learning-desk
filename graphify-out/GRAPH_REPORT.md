# Graph Report - atrium-learning-desk  (2026-10-16)

## Corpus Check
- 123 files · ~142,403 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 7, .css 2, .lock 1)

## Summary
- 1330 nodes · 1965 edges · 84 communities (76 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 60 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5ddfc8ff`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- generate2dsprite.py
- grok-pwa-shared.mjs
- video2dsprite.py
- dependencies
- package.json
- P2PRoom
- Generate2dmap
- Map Pipeline Selection
- Phaser 3 / 4 — Deep Engine Guide (scenes, physics, scale, tilemaps, pooling, architecture)
- Video2dsprite (Grok Build only)
- Refined UI (product chrome and overlays)
- db.ts
- Animations
- 1. Your environment / workspace (for you, never surfaced to the user)
- preview-host-bridge.ts
- store.ts
- Surfaces
- server.ts
- devDependencies
- exam-vault.ts
- index.tsx
- verify.server.ts
- Controls (player-visible signs — do not ship inverted)
- professor-chat.tsx
- Imagine
- Babylon.js — Deep Engine Guide (Havok physics, cameras, SceneOptimizer, WebGPU, assets, GUI, freezing)
- Part B — Tetris
- Button
- client.ts
- compilerOptions
- Unified Input for Browser Games (keyboard + mouse + touch + Gamepad, action mapping, deadzones, buffering)
- gates.tsx
- Game Audio in the Browser (Web Audio API, mobile unlock, Howler.js, gain buses, spatial, latency)
- Collision & Physics for Browser Games (2D AABB/SAT/broadphase, swept collision, 3D Rapier/cannon, fixed timestep)
- Game Feel & Juice (screenshake, hitstop, tweening/easing, particles, squash & stretch, camera, SFX layering)
- Building Games
- Prompt Rules
- Game AI & Pathfinding (A* on grids, steering, FSM, behavior trees, navmesh)
- Genre Playbook — First-Person Shooter (FPS)
- Procedural Generation (seeded RNG, noise, dungeons/mazes/terrain, wave function collapse)
- Browser Game Best Practices — Three.js / Babylon.js / Phaser (controls, camera, orientation, loop, assets, perf)
- Transition Only What Changes
- Text Wrapping
- subject.$id.tsx
- Genre Playbook — 2D Platformer
- Genre Playbook — Arcade Racing / Kart
- Genre Playbook — Top-Down / Twin-Stick Shooter
- Genre Playbook — Voxel / Minecraft-like
- Save & Persistence for Browser Games (localStorage vs IndexedDB, versioned saves, serialization, autosave)
- Share cards, favicon, and app icons
- scripts
- @tanstack/react-router
- ECS & Game State Architecture for JS Games (bitECS, miniplex, ECS vs OOP, state structure)
- Genre Playbook — Board & Card Games (Chess, Checkers, Tic-Tac-Toe, Card games)
- Genre Playbook — Endless Runner
- Genre Playbook — Tower Defense
- Design & UI
- Generate2dsprite
- Modes
- Action Rules
- Auth
- eslint.config.mjs
- Character Consistency
- Sheet-Specific Rules
- Workflow
- Three.js (official LLM reference)
- xAI API (Grok)
- popup.server.ts
- 3D libraries for this stack (three.js + React Three Fiber + drei + rapier)
- Animation Frames — video-first
- Tilesets
- Game UI & Icons
- vite.config.ts
- NOW — atrium-learning-desk current truth
- Asset Core
- Atrium Learning Desk
- CLAUDE.md
- GROK.md
- generate2dmap/SOURCE.md
- generate2dsprite/SOURCE.md
- video2dsprite/SOURCE.md
- overrides
- startup.sh

## God Nodes (most connected - your core abstractions)
1. `P2PRoom` - 25 edges
2. `useDesk` - 21 edges
3. `Map Pipeline Selection` - 18 edges
4. `Imagine` - 16 edges
5. `Refined UI (product chrome and overlays)` - 15 edges
6. `Generate2dmap` - 15 edges
7. `ProfessorChat()` - 14 edges
8. `Button()` - 14 edges
9. `Babylon.js — Deep Engine Guide (Havok physics, cameras, SceneOptimizer, WebGPU, assets, GUI, freezing)` - 14 edges
10. `Phaser 3 / 4 — Deep Engine Guide (scenes, physics, scale, tilemaps, pooling, architecture)` - 14 edges

## Surprising Connections (you probably didn't know these)
- `What is already here` --references--> `grokPwaPlugin()`  [INFERRED]
  docs/agents/AGENTS-reference.md → scripts/grok-pwa-plugin.mjs
- `Reach for shadcn first` --references--> `Button()`  [INFERRED]
  .grok/skills/design-ui/references/refined-ui.md → src/components/ui/button.tsx
- `Share cards, favicon, and app icons` --references--> `build()`  [INFERRED]
  .grok/skills/og/SKILL.md → ai/memory/mem.py
- `Lifecycle callbacks (exact order)` --references--> `stop()`  [INFERRED]
  .grok/skills/building-games/references/phaser.md → ai/memory/mem.py
- `Scene control verbs (get these exactly right — a top bug source)` --references--> `stop()`  [INFERRED]
  .grok/skills/building-games/references/phaser.md → ai/memory/mem.py

## Import Cycles
- None detected.

## Communities (84 total, 8 thin omitted)

### Community 0 - "generate2dsprite.py"
Cohesion: 0.05
Nodes (45): build_parser(), load_props(), main(), paste_prop(), placement_xy(), read_json(), resolve_path(), alpha_bbox() (+37 more)

### Community 1 - "grok-pwa-shared.mjs"
Cohesion: 0.06
Nodes (51): 1. Your environment / workspace (for you, never surfaced to the user), Build & deploy target, First scaffold — required entry files, `/workspace/startup.sh` (required — you maintain this), pg, playwright, computeBrandWarnings(), MAX_CARD_BYTES (+43 more)

### Community 2 - "video2dsprite.py"
Cohesion: 0.08
Nodes (41): 2026-10-13 — auto-memory protocol adopted, DECISIONS — atrium-learning-desk (append-only), build(), changed(), context(), gbin(), graph(), install_hook() (+33 more)

### Community 3 - "dependencies"
Cohesion: 0.04
Nodes (51): dependencies, better-auth, class-variance-authority, clsx, cmdk, date-fns, @electric-sql/pglite, @hookform/resolvers (+43 more)

### Community 4 - "package.json"
Cohesion: 0.04
Nodes (48): name, private, sideEffects, type, cmdk, date-fns, eslint, eslint-plugin-prettier (+40 more)

### Community 5 - "P2PRoom"
Cohesion: 0.10
Nodes (17): Diagnostics, Multiplayer (WebRTC peer-to-peer), React room binding (optional — copy if it fits your app), Schema — nothing to do by default, Setup — create the signaling relay (once), Setup — mount the API route (once), Using the primitive, defaultIceServers() (+9 more)

### Community 6 - "Generate2dmap"
Cohesion: 0.05
Nodes (36): Anti-Patterns, Base Map Prompt Pattern, Collision Metadata, Dressed Reference Pass, Layer Types, Layered Raster Map Contract, One-By-One Prop Prompt Pattern, Preview Composition (+28 more)

### Community 7 - "Map Pipeline Selection"
Cohesion: 0.06
Nodes (35): `baked_raster`, `baked_scene_mode`, Collision Model, Core Map Modes, Engine Target, Escalation Heuristic, Fixed Battle Background, Genre Routing Table (+27 more)

### Community 8 - "Phaser 3 / 4 — Deep Engine Guide (scenes, physics, scale, tilemaps, pooling, architecture)"
Cohesion: 0.07
Nodes (20): 10. Performance checklist (Phaser-specific), 11. Common Phaser pitfalls (checklist), 2. Physics: Arcade vs Matter (choose deliberately), 3. Scale Manager — responsive/mobile without stretching, 4. Sprites, atlases & animations, 5. Tilemaps, 6. Object pooling with Groups (the mobile perf lever), 7. Input (+12 more)

### Community 9 - "Video2dsprite (Grok Build only)"
Cohesion: 0.06
Nodes (29): Chroma key, End-to-end, ffmpeg extract, GIF duration defaults, Normalize (feet anchor), Sampling, Suggested folder layout, Video2dsprite pipeline (+21 more)

### Community 10 - "Refined UI (product chrome and overlays)"
Cohesion: 0.07
Nodes (27): Anti-patterns, Border radius (concentric, mandatory), Buttons (token overlay / fallback), Cards / menus (token overlay / fallback), Color discipline, Components (product chrome), Content tone in the UI, Design tokens (encode once, reuse) (+19 more)

### Community 11 - "db.ts"
Cohesion: 0.13
Nodes (19): Database (server-only), Env vars — do **not** create a `.env` file, Migrations, Neon Postgres, Preview ↔ production parity, @electric-sql/pglite, createNeonSql(), createPgliteSql() (+11 more)

### Community 12 - "Animations"
Cohesion: 0.08
Nodes (24): Animations, Choosing Between Motion and CSS, Code Example, Contextual Icon Animations, CSS Example, CSS-Only Stagger, CSS Transition Approach (No Motion), CSS Transitions vs. Keyframes (+16 more)

### Community 13 - "1. Your environment / workspace (for you, never surfaced to the user)"
Cohesion: 0.07
Nodes (27): 0. Two worlds (read this first), 2. What kinds of asks you might get, 3. What might happen & how to execute, App Builder Workspace, Browser QA (agent-driven only; the user is not your QA), Communication rules (avoid confusing the user), Generated art (2D only), Memory protocol (auto, every task — do not wait to be asked) (+19 more)

### Community 14 - "preview-host-bridge.ts"
Cohesion: 0.13
Nodes (19): react, zod, AppShell(), PreviewHostBridge(), AuthProvider(), collectRoutePathsFromTree(), EnvelopeSchema, HelloSchema (+11 more)

### Community 15 - "store.ts"
Cohesion: 0.13
Nodes (20): zustand, accounting, business, DEFAULT_DEADLINES, economics, finance, p(), q() (+12 more)

### Community 16 - "Surfaces"
Cohesion: 0.09
Nodes (21): Asymmetric Icons (Stars, Arrows, Carets), Buttons with Text + Icon, Collision Rule, Concentric Border Radius, CSS Example, Dark Mode, Example, Image Outlines (+13 more)

### Community 17 - "server.ts"
Cohesion: 0.12
Nodes (14): better-auth, emailAndPasswordEnabled, GROK_ISSUER_DEFAULT, PREVIEW_ALLOWED_HOSTS, PREVIEW_CLIENT_ID, PREVIEW_CLIENT_SECRET, GROK_PROVIDERS, GrokProvider (+6 more)

### Community 18 - "devDependencies"
Cohesion: 0.10
Nodes (20): devDependencies, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-prettier, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals (+12 more)

### Community 19 - "exam-vault.ts"
Cohesion: 0.18
Nodes (16): BOX_HOURS, cardFingerprint(), cardsFromMisses(), dueCards(), makeCard(), mergeCards(), reviewAdvance(), scopeLabel() (+8 more)

### Community 20 - "index.tsx"
Cohesion: 0.19
Nodes (17): buildProfile(), FocusItem, overallMastery(), projectedGpa(), recommendFocus(), scoreToGpa(), weeklyReview(), subjectMastery() (+9 more)

### Community 21 - "verify.server.ts"
Cohesion: 0.16
Nodes (13): Per-user data (server-side — mandatory), @tanstack/react-start, assertSameSiteRequest(), CrossSiteRequestError, authMiddleware, auth, authConfigured, databaseConfigured (+5 more)

### Community 22 - "Controls (player-visible signs — do not ship inverted)"
Cohesion: 0.11
Nodes (17): 0. Hard rules (fail the build if broken), 1. Shared 3D basis (use this everywhere), 2. Genre maps, 2a. FPS / on-foot (strafe, not steer), 2b. Ground / water vehicle (kart, bike, jetski, boat, tank, rover, snowmobile), 2c. Fixed-wing flight (airplane, glider, RC plane), 2d. Heli / drone / 6DOF, 2e. 2D side-scroller / platformer (+9 more)

### Community 23 - "professor-chat.tsx"
Cohesion: 0.27
Nodes (15): ProfessorChat(), send(), AskInput, askProfessor, getChapter(), getSubject(), cardsFromExtracts(), localExtractCards() (+7 more)

### Community 24 - "Imagine"
Cohesion: 0.12
Nodes (16): Build accurate visuals with code, not the image tools, Choosing the tool, Core Principles, Failure modes to avoid, Handle flow (mandatory mental model), Imagine, `imagine_image_to_image`, `imagine_image_to_video` (+8 more)

### Community 25 - "Babylon.js — Deep Engine Guide (Havok physics, cameras, SceneOptimizer, WebGPU, assets, GUI, freezing)"
Cohesion: 0.13
Nodes (14): 10. Inspector & profiling, 11. Common Babylon pitfalls (checklist), 1. Engine setup & the render loop, 2. WebGPU (real, production-ready — prefer it with fallback), 3. Cameras & Camera Behaviors (free polish), 4. Physics — Havok (V2 plugin, the current default), 5. Asset loading — containers & glTF (do it right for level switching), 6. Materials & Node Material Editor (+6 more)

### Community 26 - "Part B — Tetris"
Cohesion: 0.13
Nodes (14): 0. The golden rule: separate model from view, A1. Core mechanics & minimal scope, A2. Match detection, A3. Gravity, refill & cascades, B1. Core mechanics & minimal scope, B2. Data model & collision, B3. Randomizer, gravity, lock delay, B4. SRS rotation & wall kicks (verbatim tables) (+6 more)

### Community 27 - "Button"
Cohesion: 0.21
Nodes (11): class-variance-authority, clsx, @radix-ui/react-slot, tailwind-merge, Button(), buttonVariants, Progress(), cn() (+3 more)

### Community 28 - "client.ts"
Cohesion: 0.20
Nodes (12): authClient, authEnabled, getBearerToken(), inLivePreview(), openSignInPopup(), PopupMessage, setBearerToken(), signIn() (+4 more)

### Community 29 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+6 more)

### Community 30 - "Unified Input for Browser Games (keyboard + mouse + touch + Gamepad, action mapping, deadzones, buffering)"
Cohesion: 0.15
Nodes (12): 1. Architecture: one action layer over all devices, 2. Keyboard: use `event.code`, track state, don't act on the event, 3. Pointer Events: unify mouse + touch + pen, 4. Touch controls (mobile), 5. Gamepad API: poll every frame, use standard mapping + deadzones, 6. Action mapping & rebinding, 7. Input buffering (responsiveness / fairness), 8. Bug-prevention checklist (+4 more)

### Community 31 - "gates.tsx"
Cohesion: 0.47
Nodes (11): Data & auth, Reading the user / protecting routes, What's pre-wired (`src/lib/auth/`), signOut(), RedirectToSignIn(), SIGN_IN_PATH, SignedIn(), SignedOut() (+3 more)

### Community 32 - "Game Audio in the Browser (Web Audio API, mobile unlock, Howler.js, gain buses, spatial, latency)"
Cohesion: 0.17
Nodes (11): 1. The autoplay unlock — the single most important rule, 2. Web Audio API vs `<audio>` vs Howler, 3. Gain buses (music / SFX / master) — do this from the start, 4. Latency (keep audio tight), 5. Variation & layering (feel), 6. Spatial / positional audio (for 3D or top-down games), 7. Formats & assets, 8. Bug-prevention checklist (+3 more)

### Community 33 - "Collision & Physics for Browser Games (2D AABB/SAT/broadphase, swept collision, 3D Rapier/cannon, fixed timestep)"
Cohesion: 0.17
Nodes (11): 1. Do you even need a physics engine?, 2. 2D collision detection primitives, 3. Broadphase: don't test every pair (O(n²) killer), 4. Tunneling & swept collision (the top correctness bug), 5. Collision *resolution* (not just detection), 6. Fixed timestep — the stability foundation (tie-in), 7. 3D character controllers, 8. Bug-prevention checklist (+3 more)

### Community 34 - "Game Feel & Juice (screenshake, hitstop, tweening/easing, particles, squash & stretch, camera, SFX layering)"
Cohesion: 0.17
Nodes (11): 1. The core principle, 2. Screenshake (the highest impact-per-effort effect), 3. Hitstop / hitstun / "sleep" (freeze frames on impact), 4. Tweening & easing (motion that isn't linear), 5. Particles & squash-and-stretch, 6. Camera feel (lerp, lookahead, deadzone, punch), 7. SFX layering & audio feel, 8. Don't over-juice (readability & perf guardrails) (+3 more)

### Community 35 - "Building Games"
Cohesion: 0.17
Nodes (11): 1. Game loop & timing (the #1 correctness issue), 2. Controls (delegate to the `controls` skill), 3. 3D orientation & world objects (the "sideways/backwards" bugs), 4. Camera must agree with movement, 5. Performance, 6. Assets (avoid the generated-photo trap), 7. Audio, save, feel, 8. Mobile (+3 more)

### Community 36 - "Prompt Rules"
Cohesion: 0.17
Nodes (12): Bundle Prompting, Character Style, Containment Rules, Creature and FX Style, Global Rules, Layout Guide Rules, Map Prop Style, Prompt Rules (+4 more)

### Community 37 - "Game AI & Pathfinding (A* on grids, steering, FSM, behavior trees, navmesh)"
Cohesion: 0.18
Nodes (10): 1. Pathfinding: A* on a grid (the default), 2. Steering behaviors (smooth local movement), 3. Finite State Machines (FSM) — decision-making for simple agents, 4. Behavior Trees (BT) — scalable decision-making, 5. Navmesh basics (3D / open spaces), 6. Performance & correctness rules, 7. Bug-prevention checklist, Defaults to apply (+2 more)

### Community 38 - "Genre Playbook — First-Person Shooter (FPS)"
Cohesion: 0.18
Nodes (10): 1. Core mechanics (minimal-but-good scope for a demo), 2. Controls & camera, 3. Weapon handling & the viewmodel, 4. Genre-specific "feel" (the juice), 5. Common bugs to avoid (checklist), Defaults to apply, ⚠️ Do NOT use a generated PHOTO as the weapon viewmodel., Genre Playbook — First-Person Shooter (FPS) (+2 more)

### Community 39 - "Procedural Generation (seeded RNG, noise, dungeons/mazes/terrain, wave function collapse)"
Cohesion: 0.18
Nodes (10): 1. Seeded RNG is the foundation — never use bare `Math.random()`, 2. Noise: value / Perlin / simplex (for terrain, textures, organic fields), 3. Dungeon / room generation, 4. Maze generation, 5. Terrain generation, 6. Wave Function Collapse (WFC) basics, 7. Bug-prevention checklist, Defaults to apply (+2 more)

### Community 40 - "Browser Game Best Practices — Three.js / Babylon.js / Phaser (controls, camera, orientation, loop, assets, perf)"
Cohesion: 0.18
Nodes (10): 1. Game loop & timing (the #1 correctness issue), 2. First-person / WASD + mouse-look controls (Three.js), 3. 3D orientation & coordinate conventions (a top source of "why is my model sideways/backwards" bugs), 4. Performance (Three.js-centric, principles apply broadly), 5. Engine / stack choice, 6. Assets: generate vs. code vs. link, 7. Mobile / responsive / touch, 8. Common browser-game bugs to prevent (checklist) (+2 more)

### Community 41 - "Transition Only What Changes"
Cohesion: 0.18
Nodes (10): CSS Example, Performance, Rules, Tailwind, Tailwind `transition-transform` Note, Transition Only What Changes, Use `will-change` Sparingly, Useful Properties (+2 more)

### Community 42 - "Text Wrapping"
Cohesion: 0.18
Nodes (10): Caveat, Font Smoothing (macOS), Good vs. Bad, Tabular Numbers, text-wrap: balance, text-wrap: pretty, Text Wrapping, Typography (+2 more)

### Community 43 - "subject.$id.tsx"
Cohesion: 0.22
Nodes (8): cardsFromChapterPin(), chapterKey, ck(), MasteryStatus, Route, searchSchema, STATUS_LABEL, SubjectDesk()

### Community 44 - "Genre Playbook — 2D Platformer"
Cohesion: 0.20
Nodes (9): 1. Core mechanics (minimal-but-good scope for a demo), 2. Jump feel — the forgiveness features (do ALL of these), 3. Collision — tilemap / AABB (the #1 bug source), 4. One-way (drop-through) platforms, 5. Camera, 6. Common bugs to avoid (checklist), Defaults to apply, Genre Playbook — 2D Platformer (+1 more)

### Community 45 - "Genre Playbook — Arcade Racing / Kart"
Cohesion: 0.20
Nodes (9): 1. Core mechanics (minimal-but-good scope for a demo), 2. Arcade handling (pseudo-physics, not a sim), 3. Drift (the payoff mechanic), 4. Checkpoints & laps (get this right or laps break), 5. Camera, 6. Common bugs to avoid (checklist), Defaults to apply, Genre Playbook — Arcade Racing / Kart (+1 more)

### Community 46 - "Genre Playbook — Top-Down / Twin-Stick Shooter"
Cohesion: 0.20
Nodes (9): 1. Core mechanics (minimal-but-good scope for a demo), 2. Controls & aiming (the twin-stick core), 3. Camera, 4. Bullets, enemies & performance, 5. Genre-specific "feel" (the juice), 6. Common bugs to avoid (checklist), Defaults to apply, Genre Playbook — Top-Down / Twin-Stick Shooter (+1 more)

### Community 47 - "Genre Playbook — Voxel / Minecraft-like"
Cohesion: 0.20
Nodes (9): 1. Core mechanics (minimal-but-good scope for a demo), 2. Chunking (the foundational structure), 3. Face culling & greedy meshing (the performance core), 4. Voxel raycasting: place & break blocks, 5. Collision, feel & world gen, 6. Common bugs to avoid (checklist), Defaults to apply, Genre Playbook — Voxel / Minecraft-like (+1 more)

### Community 48 - "Save & Persistence for Browser Games (localStorage vs IndexedDB, versioned saves, serialization, autosave)"
Cohesion: 0.20
Nodes (9): 1. Pick the right storage, 2. ALWAYS version your saves (the #1 lost-progress bug), 3. Serialization: what to save, 4. Autosave (do it safely), 5. Quota, availability & privacy gotchas, 6. Bug-prevention checklist, Defaults to apply, Save & Persistence for Browser Games (localStorage vs IndexedDB, versioned saves, serialization, autosave) (+1 more)

### Community 49 - "Share cards, favicon, and app icons"
Cohesion: 0.20
Nodes (9): Custom card: generate `public/og.jpg`, Favicon: hand-author `public/favicon.svg`, Not supported, `og:type` for games (X game-card presentation), Parallelize the brand-asset pass (default), PWA icons: only for installable apps, Share cards, favicon, and app icons, Which card an app gets (+1 more)

### Community 50 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, build:dev, db:migrate, dev, format, lint, preview (+2 more)

### Community 51 - "@tanstack/react-router"
Cohesion: 0.29
Nodes (6): lucide-react, @tanstack/react-router, nav, SUBJECTS, AppErrorComponent(), getRouter()

### Community 52 - "ECS & Game State Architecture for JS Games (bitECS, miniplex, ECS vs OOP, state structure)"
Cohesion: 0.22
Nodes (8): 1. What ECS is (and why it exists), 2. When ECS vs OOP (don't cargo-cult ECS), 3. Library choice: bitECS vs miniplex, 4. Structuring game state (even without a formal ECS), 5. Bug-prevention checklist, Defaults to apply, ECS & Game State Architecture for JS Games (bitECS, miniplex, ECS vs OOP, state structure), Sources

### Community 53 - "Genre Playbook — Board & Card Games (Chess, Checkers, Tic-Tac-Toe, Card games)"
Cohesion: 0.22
Nodes (8): 1. Core mechanics (minimal-but-good scope for a demo), 2. Turn state machine, 3. Legal-move validation (get this exactly right), 4. AI: minimax & alpha-beta pruning, 5. Common bugs to avoid (checklist), Defaults to apply, Genre Playbook — Board & Card Games (Chess, Checkers, Tic-Tac-Toe, Card games), Sources

### Community 54 - "Genre Playbook — Endless Runner"
Cohesion: 0.22
Nodes (8): 1. Core mechanics (minimal-but-good scope for a demo), 2. The "endless" trick: scroll the world, recycle the pieces, 3. Controls & feel, 4. Difficulty & scoring, 5. Common bugs to avoid (checklist), Defaults to apply, Genre Playbook — Endless Runner, Sources

### Community 55 - "Genre Playbook — Tower Defense"
Cohesion: 0.22
Nodes (8): 1. Core mechanics (minimal-but-good scope for a demo), 2. Map, path & pathfinding, 3. Towers: targeting, range & firing, 4. Waves & economy (the balance core), 5. Common bugs to avoid (checklist), Defaults to apply, Genre Playbook — Tower Defense, Sources

### Community 56 - "Design & UI"
Cohesion: 0.22
Nodes (8): 1. Design-system-first (do this before styling anything), 2. The quantified rubric (cheap rules that prevent "ugly"), 3. Anti-AI-slop (the tells that make output look generic — avoid), 4. Layout & hierarchy, 5. Motion (subtle, purposeful), 6. Game overlays (when this pairs with `building-games`), Design & UI, Finish checklist (before you call UI done)

### Community 57 - "Generate2dsprite"
Cohesion: 0.22
Nodes (6): Agent Rules, App-builder / Grok environment, Defaults, Generate2dsprite, Parameters, Resources

### Community 58 - "Modes"
Cohesion: 0.22
Nodes (9): Actions, Agent-First Mapping Hints, Asset Types, Bundle Presets, Legacy Compatibility, Modes, Output Shape, Processor Defaults (+1 more)

### Community 59 - "Action Rules"
Cohesion: 0.22
Nodes (9): Action Rules, `attack`, `cast`, `combat`, `hurt`, `idle`, `impact` / `explode`, `projectile` (+1 more)

### Community 60 - "Auth"
Cohesion: 0.25
Nodes (7): Auth, Env vars — do **not** create a `.env` file, Preventing auth flicker, Security model (already handled — don't undo it), Supported sign-in methods, Wiring (do this once), authPopupPlugin()

### Community 61 - "eslint.config.mjs"
Cohesion: 0.29
Nodes (6): eslint-config-prettier, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

### Community 62 - "Character Consistency"
Cohesion: 0.29
Nodes (6): 1. Asymmetry bookkeeping (turnarounds), 2. Hands and props, 3. Edit-chain protocol, 4. Variants (damage / palette / equipment), 5. Verify, Character Consistency

### Community 63 - "Sheet-Specific Rules"
Cohesion: 0.29
Nodes (7): `1x4` projectile, `3x3` large idle, `4x4` non-directional action sequence, `4x4` player sheet, `5x5` and custom grids, Mixed-action atlas guardrail, Sheet-Specific Rules

### Community 64 - "Workflow"
Cohesion: 0.29
Nodes (7): 1. Infer the asset plan, 2. Write the prompt manually, 3. Generate the raw image, 4. Postprocess locally, 5. QC the result, 6. Return the right bundle, Workflow

### Community 65 - "Three.js (official LLM reference)"
Cohesion: 0.29
Nodes (6): Finish check, Full reference, Quick defaults for this product, Stack adaptation (this app builder), Three.js (official LLM reference), When to load what

### Community 66 - "xAI API (Grok)"
Cohesion: 0.29
Nodes (6): Calling the API (server-only), Env vars — do **not** create a `.env` file, Imagine — image & video generation (server-only), Spend responsibly, Voice — text-to-speech (server-only), xAI API (Grok)

### Community 67 - "popup.server.ts"
Cohesion: 0.48
Nodes (6): completionHtml(), completionResponse(), handleAuthPopupRequest(), PopupMessage, readCookie(), SESSION_TOKEN_COOKIE

### Community 68 - "3D libraries for this stack (three.js + React Three Fiber + drei + rapier)"
Cohesion: 0.33
Nodes (5): 3D libraries for this stack (three.js + React Three Fiber + drei + rapier), Alternatives, Gotchas (map to the SKILL universals), Minimal R3F shape, When to use what

### Community 69 - "Animation Frames — video-first"
Cohesion: 0.33
Nodes (5): Animation Frames — video-first, App-builder execution (read first), Default pipeline (intent), Motion laws (verify against these, whatever the pipeline), Verify — the flip test

### Community 70 - "Tilesets"
Cohesion: 0.33
Nodes (5): 1. Seamless single tiles, 2. Transition tilesets (grass→dirt etc.), 3. Rotation economy — make fewer, better tiles, 4. Platforms and props, Tilesets

### Community 71 - "Game UI & Icons"
Cohesion: 0.33
Nodes (5): 1. Interaction states (normal/hover/pressed), 2. Icon sets, 3. Panels, bars, wordmarks, 4. No text anywhere else, Game UI & Icons

### Community 72 - "vite.config.ts"
Cohesion: 0.33
Nodes (4): nitro, @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 73 - "NOW — atrium-learning-desk current truth"
Cohesion: 0.40
Nodes (4): Goal, In flight, Known facts / constraints, NOW — atrium-learning-desk current truth

### Community 74 - "Asset Core"
Cohesion: 0.40
Nodes (4): App-builder note, Asset Core, Unprompted engine-ready defaults, Working discipline

### Community 75 - "Atrium Learning Desk"
Cohesion: 0.40
Nodes (4): Atrium Learning Desk, Run, Stack, What it is

## Knowledge Gaps
- **44 isolated node(s):** `@hookform/resolvers`, `@radix-ui/react-accordion`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox` (+39 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 816 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Phaser 3 / 4 — Deep Engine Guide (scenes, physics, scale, tilemaps, pooling, architecture)` connect `Phaser 3 / 4 — Deep Engine Guide (scenes, physics, scale, tilemaps, pooling, architecture)` to `video2dsprite.py`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `P2PRoom` (e.g. with `Multiplayer (WebRTC peer-to-peer)` and `Using the primitive`) actually correct?**
  _`P2PRoom` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@hookform/resolvers`, `@radix-ui/react-accordion`, `@radix-ui/react-alert-dialog` to the rest of the system?**
  _44 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `generate2dsprite.py` be split into smaller, more focused modules?**
  _Cohesion score 0.053613053613053616 - nodes in this community are weakly interconnected._
- **Why does `1. Scene model — the thing to get right first` connect `video2dsprite.py` to `Phaser 3 / 4 — Deep Engine Guide (scenes, physics, scale, tilemaps, pooling, architecture)`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `grok-pwa-shared.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.06012176560121765 - nodes in this community are weakly interconnected._
- **Should `video2dsprite.py` be split into smaller, more focused modules?**
  _Cohesion score 0.07814207650273224 - nodes in this community are weakly interconnected._