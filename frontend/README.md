# Gameplay frontend

See the [repository README](../README.md) for setup, rules, tests, deployment,
and the preserved original version. This application exports static HTML/CSS/JS.

The drag implementation keeps pointer capture on a stable source button and renders
a non-interactive portal above the board. Artwork and lettering share an isolated
stacking context. The inner artwork owns idle animation while the outer button owns
layout, so dragging never overwrites the animation transform. Drops commit on release;
cancel, blur, scrolling and resizing restore the pre-drag word.
