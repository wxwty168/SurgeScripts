const WIFI_DONT_NEED_PROXYS = ['Hello World!'];
const CURRENT_WIFI_SSID_KEY = 'current_wifi_ssid';
const CURRENT_OUTBOUND_MODE = 'rule'

function wifiChanged() {
    const currentWifiSSid = $persistentStore.read(CURRENT_WIFI_SSID_KEY);
    const changed = currentWifiSSid !== $network.wifi.ssid;
    changed && $persistentStore.write($network.wifi.ssid, CURRENT_WIFI_SSID_KEY);
    return changed;
}

if (wifiChanged()) {
    const currentOutboundMode = $persistentStore.read(CURRENT_OUTBOUND_MODE);
    const mode = WIFI_DONT_NEED_PROXYS.includes($network.wifi.ssid)
        ? 'direct'
        : 'rule';
    if (currentOutboundMode !== mode) {
        $surge.setOutboundMode(mode);
        $persistentStore.write(mode, CURRENT_OUTBOUND_MODE);
        $notification.post(
            'Surge',
            `Wi-Fi changed to ${$network.wifi.ssid || 'cellular'}`,
            `use ${mode} mode`
        );
    }
}

$done();