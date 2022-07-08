/**
 *
 * {
  "success": true,
  "errorCode": null,
  "dataName": "sessionData",
  "data": {...}
}
 */

fetch("https://mobileapi.qa.subarucs.com/g2v23/twoStepAuthVerify.json;jsessionid=02ED5920A885674839DE4E4A72DC996B", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "http://localhost:8000/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "contactMethod=userName&verificationCode=083881&rememberDevice=1&deviceName=2762185",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});

import { myFetch, NETResponse } from "./NETFetch";

export interface NETTwoStepAuthSendVerificationParameters {
    contactMethod: "userName" | "phone"
    verificationCode?: string
    rememberDevice: 0 | 1
    deviceName?: string
}

export const net_twoStepAuthSendVerification = async ({contactMethod, verificationCode, rememberDevice, deviceName}: NETTwoStepAuthSendVerificationParameters): Promise<NETResponse> => {
    const body = `contactMethod=${contactMethod}&verificationCode=${verificationCode}&rememberDevice=${rememberDevice}&deviceName=${deviceName}`;
    return myFetch("twoStepAuthVerify.json", {
        "headers": {},
        "body": body,
        "method": "POST",
    });
}

