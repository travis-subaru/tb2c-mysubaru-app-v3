import { NetworkResponse } from "../stores/Response";
import { getSessionID } from "../stores/Session";
import { getEnviroment } from "./Environment";
import { myFetch, stdGETRequest } from "./Fetch";

export type UnlockDoorType = "ALL_DOORS_CMD"

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

export interface RemoteServiceStatus {
    serviceRequestId: string,
    success: boolean,
    cancelled: boolean,
    remoteServiceType: "engineStart",
    remoteServiceState: "started" | "scheduled" | "finished",
    subState: null,
    errorCode: string | null,
    result: null,
    updateTime: number | null,
    vin: string,
    errorDescription: string | null
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
            return {success: true, errorCode: null, dataName: null, data: null};
    }
}

export const pollRemoteServiceStatus = async (statusEndpoint: string, serviceRequestId: string): Promise<NetworkResponse> => {
    const jsessionid = getSessionID();
    const ts = (new Date()).getTime();
    const resp = await myFetch(`${statusEndpoint};jsessionid=${jsessionid}?serviceRequestId=${encodeURIComponent(serviceRequestId)}&_=${ts}`, stdGETRequest);
    return await handleRemoteServiceResponse(statusEndpoint, resp);
};

export const executeRemoteStart = async (p: RemoteStartParameters): Promise<NetworkResponse> => {
    const e = getEnviroment();
    const jsessionid = getSessionID();
    const body = JSON.stringify(p);
    const resp = await myFetch(`service/g2/engineStart/execute.json;jsessionid=${jsessionid}`, {
        "headers": {},
        "body": body,
        "method": "POST",
    });
    return await handleRemoteServiceResponse(`https://${e.domain}/g2v23/service/g2/engineStart/status.json`, resp);
}

fetch("https://mobileapi.qa.subarucs.com/g2v23/service/g2/engineStart/execute.json;jsessionid=E4CFE3338A2BD6F3177EAC3E0B7DB82E", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "http://localhost:8000/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"name\":\"Summer Time\",\"runTimeMinutes\":\"10\",\"climateZoneFrontTemp\":\"65\",\"climateZoneFrontAirMode\":\"FEET_FACE_BALANCED\",\"climateZoneFrontAirVolume\":\"7\",\"outerAirCirculation\":\"outsideAir\",\"heatedRearWindowActive\":\"false\",\"heatedSeatFrontLeft\":\"HIGH_COOL\",\"heatedSeatFrontRight\":\"HIGH_COOL\",\"airConditionOn\":\"false\",\"canEdit\":\"true\",\"disabled\":\"false\",\"presetType\":\"userPreset\",\"startConfiguration\":\"START_ENGINE_ALLOW_KEY_IN_IGNITION\",\"pin\":\"1234\",\"delay\":0,\"vin\":\"4S3BMAA66D1038385\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});

export const executeRemoteStop = async (p: RemoteStopParameters): Promise<NetworkResponse> => {
    const e = getEnviroment();
    const jsessionid = getSessionID();
    const body = JSON.stringify(p);
    const resp = await myFetch(`service/g2/engineStop/execute.json;jsessionid=${jsessionid}`, {
        "headers": {},
        "body": body,
        "method": "POST",
    });
    return await handleRemoteServiceResponse(`https://${e.domain}/g2v23/service/g2/engineStop/status.json`, resp);
}
