import { getSessionID } from "../stores/Session";
import { myCheck, myFetch } from "./Fetch";

export interface TwoStepContactInfo {
    phone?: string
    userName?: string
}

export type ContactMethodType = "text" | "email";

export interface TwoStepAuthSendVerifyParameters {
    contactMethod: ContactMethodType
    verificationCode?: string
    languageCode: string
    deviceName: "DEVICENAME" // TODO
}

export const requestTwoStepAuthContact = async (): Promise<TwoStepContactInfo> => {
    const jsessionid = getSessionID();
    const resp = await myFetch(`twoStepAuthContacts.json;jsessionid=${jsessionid}`, {
        "headers": {},
        "body": null,
        "method": "POST",
    });
    return resp.success && resp.dataName === "dataMap" ? resp.data : {};
}

export const requestTwoStepAuthSendVerification = async (p: TwoStepAuthSendVerifyParameters) => {
    const jsessionid = getSessionID();
    const body = `contactMethod=${p.contactMethod}&verificationCode=${p.verificationCode}&languageCode=${p.languageCode}`;
    return myCheck(`twoStepAuthSendVerification.json;jsessionid=${jsessionid}`, {
        "headers": {},
        "body": body,
        "method": "POST",
    });
}

export const requestTwoStepAuthVerify = async (p: TwoStepAuthSendVerifyParameters) => {
    const jsessionid = getSessionID();
    const body = `contactMethod=${p.contactMethod}&verificationCode=${p.verificationCode}&deviceName=${p.deviceName}`;
    return myCheck(`twoStepAuthVerify.json;jsessionid=${jsessionid}`, {
        "headers": {},
        "body": body,
        "method": "POST",
    });
}
