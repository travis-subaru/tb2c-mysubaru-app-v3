
import { myFetch, NETResponse } from "./NETFetch";
import { getEnviroment } from "./NETEnvironment";
import { getDeviceInfo } from "./UtilDeviceInfo"

export interface NETLoginParameters {
    loginUsername: string
    password: string
    passwordToken?: string
    selectedVin?: string
    rememberUserCheck: "on" | "off"
    pushToken?: string
}

export const net_login = async (params: NETLoginParameters): Promise<NETResponse> => {
    const d = getDeviceInfo();
    const e = getEnviroment();
    const loginUsername = encodeURIComponent(params.loginUsername);
    const password = params.password;
    const passwordToken = params.passwordToken ?? '';
    const selectedVin = params.selectedVin ?? '';
    const rememberUserCheck = params.rememberUserCheck ?? '';
    const pushToken = params.pushToken ?? '';
    const body = `env=${e.env}&loginUsername=${loginUsername}&password=${password}&deviceId=${d.deviceId}&passwordToken=${passwordToken}&selectedVin=${selectedVin}&rememberUserCheck=${rememberUserCheck}&pushToken=${pushToken}&deviceType=${d.deviceType}`;
    return myFetch("login.json", {
        "headers": {},
        "body": body,
        "method": "POST",
    });
}
