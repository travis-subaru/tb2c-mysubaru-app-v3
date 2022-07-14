import { getSessionID } from "../stores/Session";
import { myCheck } from "./Fetch";

export interface NETTwoStepAuthSendVerificationParameters {
    contactMethod: "userName" | "phone"
    verificationCode?: string
    // rememberDevice: 0 | 1
    deviceName?: string
}

export const net_twoStepAuthSendVerification = async (p: NETTwoStepAuthSendVerificationParameters) => {
    const jsessionid = getSessionID();
    const body = `contactMethod=${p.contactMethod}&verificationCode=${p.verificationCode}&deviceName=${p.deviceName}`;
    return myCheck(`twoStepAuthVerify.json;jsessionid=${jsessionid}`, {
        "headers": {},
        "body": body,
        "method": "POST",
    });
}

