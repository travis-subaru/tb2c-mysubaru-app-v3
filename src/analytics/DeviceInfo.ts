var hex: string[] = [];
for (var i = 0; i < 16; i++) {
    hex[i] = (i).toString(16);
}

/** UUID generator.
 *  Uses Math.random() instead of window.crypto for react-native. */
export const UUID = (): string => {
    const pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    let result = "";
    for (var i = 0; i < pattern.length; i++) {
        const value = Math.floor(Math.random() * 16);
        if (pattern[i] === 'x') {
            result += hex[value | 0x0];
        } else if (pattern[i] === 'y') {
            result += hex[value | 0x8];
        } else {
            result += pattern[i];
        }
    }
    return result;
}

// TODO: Get hardware UUID (where able)
// TODO: Create a UUID (and save) for react-native-web
// ????: Talk to Brian about web fingerprint

export interface DeviceInfo {
    deviceId: string
    deviceType: string
}

export const getDeviceInfo = (): DeviceInfo => {
    return {deviceId: UUID(), deviceType: "unknown"}
}
