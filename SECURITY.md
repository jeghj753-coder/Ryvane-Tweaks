# Security

## Official downloads

Only trust releases from this GitHub repository or the official Ryvane Discord: https://discord.gg/Xf2k8bHNq

Verify release files against the published SHA-256 hashes before running them.

## Reporting a problem

If a tweak causes a crash, boot problem, broken networking, display issue, or unexpected security change, stop applying further tweaks and report the exact option used, Windows version, GPU/driver, and what changed.

## Release rules

Ryvane releases should avoid:

- disabling Windows Defender or security services
- disabling Windows Update
- mass-disabling services without compatibility checks
- unsafe BCD/timer modifications
- automatic BIOS/firmware writes
- irreversible changes without a documented recovery path

Administrator privileges may be required for legitimate Windows configuration changes, but elevation should only be requested when needed by the app.
