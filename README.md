# Better Spelling Bee — gameplay edition

An animated duck pond word game, exported as a static site for GitHub Pages.
The opening scene has **Normal** and **Infinite** buttons. No account, API,
database, server runtime, analytics, or external font service is required.

## Play

- **Normal:** one puzzle per UTC day, identical across devices; progress stays locally.
- **Infinite:** use the original reset-game control for a new puzzle. The bank contains 366 puzzles;
  puzzles can repeat; resetting starts a fresh game.
- Click or type letters, or drag ducks into the tray. Drag within the tray to reorder;
  drag it outside to remove it. Enter submits, Backspace deletes,
  and Escape cancels an active drag (or clears the current word).
- Use at least four letters and include the white letter. Four-letter words earn
  1 point, longer words earn their length, and pangrams earn 14 points. Genius is
  70% of available points; completion requires finding every word.
- Reduced-motion preferences are respected. Sound is opt-in.

The 366 bundled puzzles in `frontend/src/game/puzzles.json` derive solely from the
original `backend/daily_data/data/cleaned.txt` and `pangrams.txt` word lists at
`9b34715f58b06374f31869de310b5e88f00c1980`. They contain no player/database data.
The original dictionary includes uncommon words and some proper names; this edition
retains that vocabulary. Each puzzle has seven letters, 20–90 accepted words, and at
least one pangram. No network request is needed to generate, validate, or save a game
after the page assets load. A first load/reload still needs the static site available;
this is not an installable offline PWA. Local progress does not sync across devices.

## Develop and verify

Node 22, npm:

```sh
cd frontend
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
NEXT_PUBLIC_BASE_PATH=/better-spelling-bee npm run build
npm run verify:static
npm start
```

The exported production site is served at
`http://127.0.0.1:4321/better-spelling-bee/` by the last command. `npm run dev` uses
Next's local development server at port 3000 without the Pages prefix.
The deployable artifact is **only `frontend/out`**; do not publish the repository root.

Tests cover word validation/scoring, every bundled puzzle, untrusted local-storage
content, drag insertion/removal, repeated drags, capture release, pointer cancel,
Escape, resize, touch events, and unmount cleanup. The static audit verifies routes,
base paths and absence of old credentials/API references in the generated assets.

## Deployment and preserved original

- Original/default `main` is unchanged.
- Backup: `backup/pre-gameplay-only-2026-10-13`, SHA
  `9b34715f58b06374f31869de310b5e88f00c1980`.
- Gameplay development and automatic deployment: `gameplay-only-pages`.
- `.github/workflows/pages.yml` tests and exports on pushes to that branch, then
  deploys the artifact through GitHub Pages. Repository Pages source is GitHub Actions.
- Public site: https://kimestelle.github.io/better-spelling-bee/

The retired backend, login/profile code, checked-in databases, and Python virtual
environments were removed only from this gameplay branch. They remain recoverable
on the backup branch and original main commit.

## Original presentation

The score line, found-word dropdown, settings panel, win screen, layout, type,
noise texture, pond geometry and duck sizing are restored from the preserved original.
Idle ducks remain stationary: one random duck briefly flaps every 2 seconds,
using the original duck and duck-fly sprites. The two-button opening and backend-free
puzzles are the requested exceptions.
