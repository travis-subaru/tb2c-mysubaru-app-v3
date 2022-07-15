import { getSessionID } from "../stores/Session";
import { myCheck, stdGETRequest } from "./Fetch";

export const requestSelectVehicle = async (vin: string) => {
    const jsessionid = getSessionID();
    const ts = (new Date()).getTime();
    return await myCheck(`selectVehicle.json;jsessionid=${jsessionid}?vin=${vin}&_=${ts}`, stdGETRequest);
}

