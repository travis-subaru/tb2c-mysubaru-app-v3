import { Language } from "./Language";

export type RemoteServiceState = "started" | "scheduled" | "finished";
export type RemoteServiceType = "engineStart" | "engineStop"
export type UnlockDoorType = "ALL_DOORS_CMD" | "FRONT_LEFT_DOOR_CMD" | "TAILGATE_DOOR_CMD"

export interface RemoteServiceStatus {
    serviceRequestId: string,
    success: boolean,
    cancelled: boolean,
    remoteServiceState: RemoteServiceState,
    remoteServiceType: RemoteServiceType,
    subState: null,
    errorCode: string | null,
    result: null,
    updateTime: number | null,
    vin: string,
    errorDescription: string | null
}

// TODO: Locale mapping
const presentTenseForType = (type: RemoteServiceType): string => {
    switch (type) {
        case "engineStart": return "REMOTE ENGINE START";
        case "engineStop": return "REMOTE ENGINE STOP";
    }
}

const pastTenseForType = (type: RemoteServiceType): string => {
    switch (type) {
        case "engineStart": return "ENGINE STARTED";
        case "engineStop": return "ENGINE STOPPED";
    }
}

export const descriptionForRemoteServiceStatus = (i18n: Language, status: RemoteServiceStatus): string => {
    switch (status.remoteServiceState) {
        case "started": return `Sending ${presentTenseForType(status.remoteServiceType)} to your vehicle`;
        case "scheduled": return `Scheduled Message here for ${presentTenseForType(status.remoteServiceType)}`;
        case "finished": {
            const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
            const now = (new Date()).toLocaleString('en-US', options);
            return `${pastTenseForType(status.remoteServiceType)} at ${now}`
        }
    }
}

export const descriptionForUnlockDoorType =  (i18n: Language, type: UnlockDoorType): string => {
    switch (type) {
        case "ALL_DOORS_CMD": return i18n.unlockSettingPanel.allDoors;
        case "FRONT_LEFT_DOOR_CMD": return i18n.unlockSettingPanel.justDriverDoor;
        case "TAILGATE_DOOR_CMD": return i18n.unlockSettingPanel.tailgate;
    }
}
