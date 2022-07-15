import { getSessionID } from "../stores/Session";
import { myFetch } from "./Fetch";

// fetch("https://mobileapi.qa.subarucs.com/g2v23/service/g2/engineStart/execute.json;jsessionid=0F47C4BFCFA6AEAFC216E6EAF02B406A", {
//   "headers": {
//     "accept": "application/json, text/javascript, */*; q=0.01",
//     "accept-language": "en-US,en;q=0.9",
//     "content-type": "application/json",
//     "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "cross-site"
//   },
//   "referrer": "http://localhost:8000/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"name\":\"Summer Time\",\"runTimeMinutes\":\"10\",\"climateZoneFrontTemp\":\"65\",\"climateZoneFrontAirMode\":\"FEET_FACE_BALANCED\",\"climateZoneFrontAirVolume\":\"7\",\"outerAirCirculation\":\"outsideAir\",\"heatedRearWindowActive\":\"false\",\"heatedSeatFrontLeft\":\"HIGH_COOL\",\"heatedSeatFrontRight\":\"HIGH_COOL\",\"airConditionOn\":\"false\",\"canEdit\":\"true\",\"disabled\":\"false\",\"presetType\":\"userPreset\",\"startConfiguration\":\"START_ENGINE_ALLOW_KEY_IN_IGNITION\",\"pin\":\"1234\",\"delay\":0,\"vin\":\"4S3BMAA66D1038385\"}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "omit"
// });

export interface RemoteStartParameters {
    airConditionOn: "false"
    canEdit: "true"
    climateZoneFrontAirMode: "FEET_FACE_BALANCED"
    climateZoneFrontAirVolume: "7"
    climateZoneFrontTemp: "65"
    delay: 0
    disabled: "false"
    heatedRearWindowActive: "false"
    heatedSeatFrontLeft: "HIGH_COOL"
    heatedSeatFrontRight: "HIGH_COOL"
    name: "Summer Time"
    outerAirCirculation: "outsideAir"
    pin: "1234"
    presetType: "userPreset"
    runTimeMinutes: "10"
    startConfiguration: "START_ENGINE_ALLOW_KEY_IN_IGNITION"
    vin: "4S3BMAA66D1038385"
}

export const executeRemoteStart = async (params: RemoteStartParameters) => {
    const jsessionid = getSessionID();
    const body = JSON.stringify(JSON.stringify(params));
    return myFetch("service/g2/engineStart/execute.json;jsessionid=0F47C4BFCFA6AEAFC216E6EAF02B406A", {
        "headers": {},
        "body": body,
        "method": "POST",
    });
}

// fetch("https://mobileapi.qa.subarucs.com/g2v23/service/g2/engineStart/status.json;jsessionid=0F47C4BFCFA6AEAFC216E6EAF02B406A?serviceRequestId=4S3BMAA66D1038385_1657918286136_22_%40NGTP&_=1657918100889", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "cross-site"
//   },
//   "referrer": "http://localhost:8000/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "omit"
// });
