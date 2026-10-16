# Ryvane Tweaks source

This folder contains the application code recovered from the current Ryvane Free Beta Electron package.

## Structure

- `electron/` — readable Electron backend, IPC handlers, tweak definitions, power plans, game-mode logic and preload bridge.
- `frontend/` — the built React frontend shipped with the current app.
- `package.json` — package metadata from the packaged application.

## Important transparency note

The Electron/backend code is readable JavaScript. The current frontend available from the packaged app is a compiled/minified React production bundle; the original JSX/TypeScript project files were not present in the package supplied for this release. It is included here so users can inspect the UI logic that actually ships.

Ryvane should only be distributed with the applicable project and third-party licenses/attributions. See the repository root `LICENSE` and `THIRD_PARTY_NOTICES.md`.

Official Discord: https://discord.gg/Xf2k8bHNq
