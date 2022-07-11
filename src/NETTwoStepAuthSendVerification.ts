import { myFetch, NETResponse } from "./NETFetch";

export interface NETTwoStepAuthSendVerificationParameters {
    contactMethod: "userName" | "phone"
    verificationCode?: string
    languageCode: LanguageID
}

export const net_twoStepAuthSendVerification = async ({contactMethod, verificationCode, languageCode}: NETTwoStepAuthSendVerificationParameters): Promise<NETResponse> => {
    const body = `contactMethod=${contactMethod}&verificationCode=${verificationCode}&languageCode=${languageCode}`;
    return myFetch("twoStepAuthSendVerification.json", {
        "headers": {},
        "body": body,
        "method": "POST",
    });
}