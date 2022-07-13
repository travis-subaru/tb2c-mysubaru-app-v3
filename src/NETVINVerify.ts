import { setItem } from "./Local";
import { getEnviroment } from "./NETEnvironment";

// ????: Are there other endpoints that return a simple bool?
// ????: Does this endpoint only exist because VINs are not validated locally?

export const requestVINVerify = async (VIN: string): Promise<Boolean> => {
    const e = getEnviroment();
    // Using .then().catch() pyramids to roll in errors
    return new Promise<Boolean>((resolve, _) => {
        fetch(`https://${e.domain}/g2v23/vinVerify.json?vin=${VIN}`, {
            "headers": {}, "body": null, "method": "GET"
        }).then((response) => {
            response.json().then((json) => {
                if (json === true) {
                    resolve(true);
                } else {
                    // TODO: Set cache lifetime
                    setItem("invalidVINs", [VIN]);
                    resolve(false);
                }
            }).catch((reason) => {
                // TODO: Report json fail to error channel
                resolve(false);
            });
        }).catch((reason) => {
            // TODO: Report network fail to error channel
            resolve(false);
        });
    })
};
