import { ErrorCode } from "../model/Code";
import { Language } from "../model/Language";
import { VehicleCondition } from "../model/VehicleCondition";
import { NetworkResponse, normalizeEndpoint } from "../stores/Response";
import { getSessionID } from "../stores/Session";
import { myFetch, JSONHeaders, GETJSONRequest } from "./Fetch";

export type RemoteServiceState = "started" | "scheduled" | "finished";
export type RemoteServiceType = "engineStart" | "engineStop" | "lock" | "unlock" | "condition" | "hornLights";
export type UnlockDoorType = "ALL_DOORS_CMD" | "FRONT_LEFT_DOOR_CMD" | "TAILGATE_DOOR_CMD";

// ????: Some endpoints have _={timestamp}. Others don't. Why?
// ????: Should jsessionId be automatic? Can jsessionId be automatic?

export interface RemoteServiceResultSuccess {
    success: true
    data: VehicleCondition
    notes: {
		failureReason: null,
		failureDescription: null,
		errorDescription: null,
		errorCode: null,
		errorLabel: null
    }
}

export interface RemoteServiceStatus {
    serviceRequestId: string,
    success: boolean,
    cancelled: boolean,
    remoteServiceState: RemoteServiceState,
    remoteServiceType: RemoteServiceType,
    subState: null,
    errorCode: string | null,
    result: null | RemoteServiceResultSuccess,
    updateTime: number | null,
    vin: string,
    errorDescription: string | null
}

export interface RemoteServiceNetworkResponse {
    success: boolean
    errorCode: null | ErrorCode
    dataName: "remoteServiceStatus"
    data: RemoteServiceStatus
    endpoint: string
}

// TODO: Finish type annotation
export interface RemoteStartParameters {
    pin: string
    delay: number
    unlockDoorType: UnlockDoorType
    name: string
    runTimeMinutes: string
    climateZoneFrontTemp: string
    climateZoneFrontAirMode: "FEET_FACE_BALANCED"
    climateZoneFrontAirVolume: string
    outerAirCirculation: "outsideAir"
    heatedRearWindowActive: string
    heatedSeatFrontLeft: "HIGH_COOL"
    heatedSeatFrontRight: "HIGH_COOL"
    airConditionOn: string
    canEdit: string
    disabled: string
    presetType: "userPreset"
    startConfiguration: "START_ENGINE_ALLOW_KEY_IN_IGNITION"
}

export interface RemoteStopParameters {
    pin: string
    delay: number
    unlockDoorType: UnlockDoorType
}

export interface RemoteLockParameters {
    pin: string
    delay: number
    forceKeyInCar: boolean
    vin: string
}

export interface RemoteUnlockParameters {
    unlockDoorType: UnlockDoorType
    pin: string
    delay: number
    vin: string
}

export interface HornLightsParameters {
    pin: string
    delay: number
    vin: string
}

export const descriptionForUnlockDoorType = (i18n: Language, type: UnlockDoorType): string => {
    switch (type) {
        case "ALL_DOORS_CMD": return i18n.unlockSettingPanel.allDoors;
        case "FRONT_LEFT_DOOR_CMD": return i18n.unlockSettingPanel.justDriverDoor;
        case "TAILGATE_DOOR_CMD": return i18n.unlockSettingPanel.tailgate;
    }
};

export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const handleRemoteServiceResponse = async (statusEndpoint: string, response: NetworkResponse): Promise<NetworkResponse> => {
    if (response.success == false) { return response; }
    if (response.dataName !== "remoteServiceStatus") { return response; }
    const status: RemoteServiceStatus = response.data;
    switch (status.remoteServiceState) {
        case "started":
            await delay(3000); // ????: Can I get a call time here
            return await pollRemoteServiceStatus(statusEndpoint, status.serviceRequestId);
        case "scheduled":
            await delay(3000); // ????: Can I get a call time here
            await pollRemoteServiceStatus(statusEndpoint, status.serviceRequestId);
        case "finished":
            return {success: true, errorCode: null, dataName: null, data: null, endpoint: response.endpoint};
    }
};

export const pollRemoteServiceStatus = async (statusEndpoint: string, serviceRequestId: string): Promise<NetworkResponse> => {
    const jsessionid = getSessionID();
    const ts = (new Date()).getTime();
    const resp = await myFetch(`${statusEndpoint};jsessionid=${jsessionid}?serviceRequestId=${encodeURIComponent(serviceRequestId)}&_=${ts}`, GETJSONRequest);
    return await handleRemoteServiceResponse(statusEndpoint, resp);
};

// TODO: Gen 0 / Gen 1 support?
export const getRemoteCommandEndpoint = (command: RemoteServiceType): string => {
    switch (command) {
        case "engineStart": return "service/g2/engineStart/execute.json";
        case "engineStop": return "service/g2/engineStop/execute.json";
        case "lock": return "service/g2/lock/execute.json";
        case "unlock": return "service/g2/unlock/execute.json";
        case "condition": return "service/g2/condition/execute.json";
        case "hornLights": return "service/g2/hornLights/execute.json";
    }
}

export const executeRemoteStart = async (p: RemoteStartParameters): Promise<NetworkResponse> => {
    const jsessionid = getSessionID();
    const body = JSON.stringify(p);
    const resp = await myFetch(`${getRemoteCommandEndpoint("engineStart")};jsessionid=${jsessionid}`, {
        "headers": JSONHeaders,
        "body": body,
        "method": "POST",
    });
    return await handleRemoteServiceResponse(`service/g2/remoteService/status.json`, resp);
};

export const executeRemoteStop = async (p: RemoteStopParameters): Promise<NetworkResponse> => {
    const jsessionid = getSessionID();
    const body = JSON.stringify(p);
    const resp = await myFetch(`${getRemoteCommandEndpoint("engineStop")};jsessionid=${jsessionid}`, {
        "headers": JSONHeaders,
        "body": body,
        "method": "POST",
    });
    return await handleRemoteServiceResponse(`service/g2/remoteService/status.json`, resp);
};

export const executeRemoteLock = async (p: RemoteLockParameters): Promise<NetworkResponse> => {
    const jsessionid = getSessionID();
    const body = JSON.stringify(p);
    const resp = await myFetch(`${getRemoteCommandEndpoint("lock")};jsessionid=${jsessionid}`, {
        "headers": JSONHeaders,
        "body": body,
        "method": "POST",
    });

    const status = await handleRemoteServiceResponse(`service/g2/remoteService/status.json`, resp);
    if (status.success) {
        return await executeConditionCheck();
    } else {
        return status;
    }
};

export const executeRemoteUnlock = async (p: RemoteUnlockParameters): Promise<NetworkResponse> => {
    const jsessionid = getSessionID();
    const body = JSON.stringify(p);
    const resp = await myFetch(`${getRemoteCommandEndpoint("unlock")};jsessionid=${jsessionid}`, {
        "headers": JSONHeaders,
        "body": body,
        "method": "POST",
    });
    return await handleRemoteServiceResponse(`service/g2/remoteService/status.json`, resp);
};

export const executeConditionCheck = async (): Promise<NetworkResponse> => {
    const jsessionid = getSessionID();
    const ts = (new Date()).getTime();
    const resp = await myFetch(`${getRemoteCommandEndpoint("condition")};jsessionid=${jsessionid}?_=${ts}`, {
        "headers": JSONHeaders,
        "body": null,
        "method": "GET",
    });
    return await handleRemoteServiceResponse(`service/g2/remoteService/status.json`, resp);
};

export const executeHornLights = async (p: HornLightsParameters): Promise<NetworkResponse> => {
    const jsessionid = getSessionID();
    const resp = await myFetch(`${getRemoteCommandEndpoint("hornLights")};jsessionid=${jsessionid}`, {
        "headers": JSONHeaders,
        "body": null,
        "method": "GET",
    });
    return await handleRemoteServiceResponse(`service/g2/hornLights/status.json`, resp);
};
