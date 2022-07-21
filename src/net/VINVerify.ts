import { myCheck, GETRequest } from "./Fetch";

export const requestVINVerify = async (VIN: string) => {
    return await myCheck(`vinVerify.json?vin=${VIN}`, GETRequest);
};
