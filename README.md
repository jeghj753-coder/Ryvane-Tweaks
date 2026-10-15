# Ryvane Tweaks

Open-source Windows gaming performance utility.

## Automatic updates

Ryvane uses `electron-updater` with GitHub Releases from `jeghj753-coder/Ryvane-Tweaks`. Installed builds check for updates shortly after launch.

### Publishing a new version

1. Update the version in `package.json` (for example `2.5.0`).
2. Commit and push the change.
3. Create and push a matching Git tag such as `v2.5.0`.
4. GitHub Actions builds `Ryvane-Setup-2.5.0.exe` and publishes the release files.
5. Existing installed copies can detect the release automatically.
