const { app, dialog } = require('electron');

app.whenReady().then(() => {
  try {
    if (!app.isPackaged) return;
    const { autoUpdater } = require('electron-updater');

    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;

    autoUpdater.on('update-downloaded', async (info) => {
      const result = await dialog.showMessageBox({
        type: 'info',
        title: 'Ryvane Update Ready',
        message: `Ryvane ${info.version || 'update'} is ready.`,
        detail: 'Restart Ryvane now to install the update?',
        buttons: ['Restart & Update', 'Later'],
        defaultId: 0,
        cancelId: 1
      });

      if (result.response === 0) autoUpdater.quitAndInstall(false, true);
    });

    setTimeout(() => {
      autoUpdater.checkForUpdatesAndNotify().catch(() => {});
    }, 5000);
  } catch (error) {
    console.error('Ryvane updater failed:', error);
  }
});
