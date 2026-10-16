# Ryvane Tweaks

Ryvane Tweaks is a Windows gaming-performance utility focused on configurable, reversible system optimizations.

## Public source

➡️ **Browse the code in [`source/`](./source/README.md).**

The public source folder exposes the Electron backend, IPC bridge, driver logic, Game Mode logic, power-plan handling, and the tweak catalog/apply/revert behavior used by the current Free Beta. Large backend files are stored as plain-text chunks because of repository write-size limits; they are not encrypted or hidden.

The frontend recovered from the shipped app is a compiled/minified React production bundle. The original unbundled JSX/TypeScript project files were not present in the package, so Ryvane should not be described as fully reproducible from original frontend source until those project files exist.

## Transparency

This repository is the public home for Ryvane's code, release workflow, checksums, and documentation. Users can inspect the Windows/registry/PowerShell behavior before running a release.

## Safety

Ryvane changes Windows settings and may require administrator privileges. Create a restore point before applying system tweaks and test changes before distributing them broadly.

Normal Ryvane releases should avoid disabling Windows security, Windows Update, boot-critical services, or recovery features.

## Verify downloads

Official release hashes are published in `SHA256SUMS.txt` and generated for release artifacts by GitHub Actions.

Current Free Beta ZIP SHA-256:

`7a9b4c4a517c22f355da104b673971e569a014c687eda277dcb673f709255d27`

## Official links

- GitHub: https://github.com/jeghj753-coder/Ryvane-Tweaks
- Discord: https://discord.gg/Xf2k8bHNq

## Releases

Official builds should be distributed through GitHub Releases or the official Ryvane Discord. Avoid random mirrors or reuploads.

## Third-party software

Ryvane uses Electron/Chromium and other open-source dependencies. Their licenses and notices must remain included where required. See `THIRD_PARTY_NOTICES.md` and the license files distributed with the application.

## License

The repository currently contains an MIT license for Ryvane-owned code. Third-party code remains under its own license terms. Only publish or redistribute code you own or have explicit permission to distribute.
