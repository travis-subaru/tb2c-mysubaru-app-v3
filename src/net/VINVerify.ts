import { setItem } from "../stores/Local";
import { myCheck, stdGETRequest } from "./Fetch";

// ????: Does this endpoint only exist because VINs are not validated locally?

export const requestVINVerify = async (VIN: string) => {
    const ok = await myCheck(`https://${e.domain}/g2v23/vinVerify.json?vin=${VIN}`, stdGETRequest);
    if (!ok) {
        setItem("invalidVINs", [VIN]); // TODO: Set cache lifetime
    }
    return ok;
};
