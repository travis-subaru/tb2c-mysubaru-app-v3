import { getSessionID } from "../stores/Session";
import { myCheck, GETRequest } from "./Fetch";

export const requestRefreshVehicles = async () => {
    const jsessionid = getSessionID();
    const ts = (new Date()).getTime();
    return await myCheck(`refreshVehicles.json;jsessionid=${jsessionid}?_=${ts}`, GETRequest);
}
