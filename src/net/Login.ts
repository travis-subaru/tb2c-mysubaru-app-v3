import { myFetch } from "./Fetch";
import { getEnviroment } from "./Environment";
import { getDeviceInfo } from "../analytics/DeviceInfo"

export interface LoginParameters {
    loginUsername: string
    password: string
    passwordToken?: string
    selectedVin?: string
    rememberUserCheck: "on" | "off"
    pushToken?: string
}

export const requestLogin = async (params: LoginParameters) => {
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
