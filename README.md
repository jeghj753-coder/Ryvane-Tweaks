# Ryvane Tweaks

Ryvane Tweaks is a Windows gaming-performance utility focused on configurable, reversible system optimizations.

## Transparency

This repository is the public home for Ryvane's code, release workflow, checksums, and documentation.

The current public beta contains extracted Electron application code plus a compiled frontend bundle. The backend tweak logic can be inspected directly. The original unbundled React/JSX frontend source is not available in the package we currently have, so the project should not be described as fully reproducible from source until that source is added.

## Safety

Ryvane changes Windows settings and may require administrator privileges. Create a restore point before applying system tweaks and test changes on your own PC before distributing them broadly.

Do not disable Windows security, Windows Update, boot-critical services, or other recovery/security features as part of normal Ryvane releases.

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
