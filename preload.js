const { contextBridge, ipcRenderer } = require('electron');
const { machineIdSync } = require('node-machine-id');
const os = require('os');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getHWID() {
    const hwidPath = path.join(os.homedir(), '.aphrodite-hwid');

    try {
        if (fs.existsSync(hwidPath)) {
            const savedHwid = fs.readFileSync(hwidPath, 'utf8').trim();
            if (savedHwid && savedHwid.length >= 32) {
                return savedHwid;
            }
        }
    } catch (e) {}

    let hwid;
    try {
        hwid = machineIdSync({ original: true });
    } catch (e) {
        const systemInfo = [
            os.hostname(),
            os.platform(),
            os.arch(),
            os.cpus()[0]?.model || '',
            os.totalmem().toString()
        ].join('|');
        hwid = crypto.createHash('sha256').update(systemInfo).digest('hex');
    }

    try {
        fs.writeFileSync(hwidPath, hwid, 'utf8');
    } catch (e) {}

    return hwid;
}

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize-window'),
    maximize: () => ipcRenderer.send('maximize-window'),
    close: () => ipcRenderer.send('close-window'),

    getHWID: () => getHWID(),
    loginSuccess: (userData) => ipcRenderer.send('login-success', userData),
    logout: () => ipcRenderer.send('logout'),

    checkAdmin: () => ipcRenderer.invoke('check-admin'),
    getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
    applyTweak: (tweakId) => ipcRenderer.invoke('apply-tweak', tweakId),
    resetTweak: (tweakId) => ipcRenderer.invoke('reset-tweak', tweakId),
    getAppliedTweaks: () => ipcRenderer.invoke('get-applied-tweaks'),
    getAllTweaks: () => ipcRenderer.invoke('get-all-tweaks'),
    createRestorePoint: () => ipcRenderer.invoke('create-restore-point'),
    openExternal: (url) => ipcRenderer.invoke('open-external', url),

    onSystemMetrics: (callback) => {
        ipcRenderer.on('system-metrics', (event, data) => callback(data));
    }
});
contextBridge.exposeInMainWorld('ryvaneExtras', {
 list: () => ipcRenderer.invoke('ryvane-extra-list'),
 apply: (id, mode) => ipcRenderer.invoke('ryvane-extra-apply', id, mode),
 scan: () => ipcRenderer.invoke('ryvane-booster-scan'),
 suspend: (names) => ipcRenderer.invoke('ryvane-booster-suspend', names),
 resume: () => ipcRenderer.invoke('ryvane-booster-resume')
});
