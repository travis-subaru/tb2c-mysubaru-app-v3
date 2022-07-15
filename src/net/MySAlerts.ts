import { getSessionID } from "../stores/Session";
import { myCheck, stdGETRequest } from "./Fetch";

export const requestMySAlerts = async () => {
    const jsessionid = getSessionID();
    const ts = (new Date()).getTime();
    await myCheck(`mysAlerts.json;jsessionid=${jsessionid}?_=${ts}`, stdGETRequest);
    return true; // TODO: Need coverage for when there is an alert
}
