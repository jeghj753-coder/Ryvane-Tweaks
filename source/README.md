# Ryvane Tweaks — Public Source

This folder exposes the code recovered from the current Ryvane Free Beta Electron package so users can inspect what the utility does.

## What is published

- `electron/driverScripts.js` — driver scan/update integration
- `electron/gameModeScripts.js` — Game Mode entry point
- `electron/powerPlans.js` — Windows power-plan handling
- `electron/preload.js` — Electron IPC bridge
- `chunks/electron/main.js.part*.txt` — Electron main-process source split into readable chunks
- `chunks/electron/managedTweaks.js.part*.txt` — tweak catalog, apply/revert logic and compatibility checks split into readable chunks
- `chunks/electron/gameModeScripts.data.js` — Game Mode implementation
- `package.json` — packaged application metadata
- `reconstruct-source.js` — helper for rebuilding chunked large source files

The large backend files are split only because of the repository connector's per-write limit. The chunks are plain JavaScript text, not encrypted or obfuscated.

## Frontend note

The package supplied for this release contains a compiled/minified React production bundle. The original React JSX/TypeScript project files were not present, so this repository must not pretend those original project files exist. The shipped frontend bundle can still be inspected separately from the Electron backend.

## Transparency

The purpose of publishing this folder is to let users review the registry, PowerShell, service, power-plan and IPC behavior before running Ryvane. Official release checksums are stored in the repository root `SHA256SUMS.txt`.

Keep all applicable project and third-party license/attribution notices when redistributing. See `LICENSE` and `THIRD_PARTY_NOTICES.md` in the repository root.

Official Discord: https://discord.gg/Xf2k8bHNq
