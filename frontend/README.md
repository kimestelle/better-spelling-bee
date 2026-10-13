# Gameplay frontend

See the [repository README](../README.md) for setup, rules, tests and deployment.

The original UI components are in `src/game/original`; the original global styles
are retained, with scoped fixes for pointer capture and duck/letter stacking.
Idle animation picks one random duck every 2000 ms and briefly swaps the original
sprites. Ducks do not bob, rotate or travel during idle. The idle timer is cleaned
up on unmount and skips ticks while dragging.

The drag implementation keeps pointer capture on a stable source button and renders
the active duck with its letter in a non-interactive portal. Tray letters keep the original SVG silhouette mask and sit above
all overlapping resting bodies. The full-size mask aligns with the sprite; only
the inner glyph catches pointer input so neighboring ducks stay draggable. Drops commit on release; cancellation, blur,
scrolling and resizing preserve the pre-drag word. The served build is static.
