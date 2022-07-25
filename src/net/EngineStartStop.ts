import { RemoteServiceStatus, UnlockDoorType } from "../model/RemoteService";
import { NetworkResponse } from "../stores/Response";
import { getSessionID } from "../stores/Session";
import { getEnviroment } from "./Environment";
import { myFetch, JSONHeaders, GETJSONRequest } from "./Fetch";

export interface RemoteStartParameters {
    pin: string
    delay: number
    unlockDoorType: UnlockDoorType
    name: "Summer Time"
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

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const handleRemoteServiceResponse = async (statusEndpoint: string, response: NetworkResponse): Promise<NetworkResponse> => {
    if (response.success == false) { return response; }
    if (response.dataName !== "remoteServiceStatus") { return response; }
    const status: RemoteServiceStatus = response.data;
    switch (status.remoteServiceState) {
        case "started":
            return await pollRemoteServiceStatus(statusEndpoint, status.serviceRequestId);
        case "scheduled":
            await delay(3000); // ????: Can I get a call time here
            await pollRemoteServiceStatus(statusEndpoint, status.serviceRequestId);
        case "finished":
            // TODO: Post message to channel
            return {success: true, errorCode: null, dataName: null, data: null, endpoint: response.endpoint};
    }
}

export const pollRemoteServiceStatus = async (statusEndpoint: string, serviceRequestId: string): Promise<NetworkResponse> => {
    const jsessionid = getSessionID();
    const ts = (new Date()).getTime();
    const resp = await myFetch(`${statusEndpoint};jsessionid=${jsessionid}?serviceRequestId=${encodeURIComponent(serviceRequestId)}&_=${ts}`, GETJSONRequest);
    return await handleRemoteServiceResponse(statusEndpoint, resp);
};

export const executeRemoteStart = async (p: RemoteStartParameters): Promise<NetworkResponse> => {
    const e = getEnviroment();
    const jsessionid = getSessionID();
    const body = JSON.stringify(p);
    const resp = await myFetch(`service/g2/engineStart/execute.json;jsessionid=${jsessionid}`, {
        "headers": JSONHeaders,
        "body": body,
        "method": "POST",
    });
    return await handleRemoteServiceResponse(`service/g2/engineStart/status.json`, resp);
}

export const executeRemoteStop = async (p: RemoteStopParameters): Promise<NetworkResponse> => {
    const e = getEnviroment();
    const jsessionid = getSessionID();
    const body = JSON.stringify(p);
    const resp = await myFetch(`service/g2/engineStop/execute.json;jsessionid=${jsessionid}`, {
        "headers": JSONHeaders,
        "body": body,
        "method": "POST",
    });
    return await handleRemoteServiceResponse(`service/g2/remoteService/status.json`, resp);
}
