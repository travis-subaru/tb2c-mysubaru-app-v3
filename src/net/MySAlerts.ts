import { getSessionID } from "../stores/Session";
import { myCheck } from "./Fetch";

// TODO: Need coverage for when there is an alert

export const requestMySAlerts = async () => {
    const jsessionid = getSessionID();
    const ts = (new Date()).getTime();
    return await myCheck(`mysAlerts.json;jsessionid=${jsessionid}?_=${ts}`, {
        "headers": {},
        "body": null,
        "method": "GET",
    });
}
