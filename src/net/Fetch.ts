import { NetworkResponse, postNetworkResponse } from "../stores/Response";
import { getEnviroment } from "./Environment";

export function parseResponse(json: any): Promise<NetworkResponse> {
    return new Promise<NetworkResponse>((resolve, reject) => {
        const parsed: NetworkResponse = json;
        // TODO: Parse and validate JSON matches spec, error otherwise
        if (parsed) {
            resolve(parsed);
        } else {
            reject({missingKey: "foo"});
        }

    })
}

/** Call endpoint with payload.
 * @return Standard response body
 */
export const myFetch = async (endpoint: string, init?: RequestInit | undefined): Promise<NetworkResponse> => {
    const e = getEnviroment();
    // Using .then().catch() pyramids to roll in errors
    return new Promise<NetworkResponse>((resolve, _) => {
        fetch(`https://${e.domain}/g2v23/${endpoint}`, init).then((response) => {
            response.json().then((json) => {
                parseResponse(json).then((responseObject) => {
                    postNetworkResponse(responseObject);
                    resolve(responseObject);
                }).catch((reason) => {
                    resolve({success: "false", errorCode: "parseError", dataName: "error", data: reason, endpoint: endpoint});
                });
            }).catch((reason) => {
                resolve({success: "false", errorCode: "jsonError", dataName: "error", data: reason, endpoint: endpoint});
            });
        }).catch((reason) => {
            // TODO: Construct a valid payload with response code (ex: clouddr is currently 501) and return
            resolve({success: "false", errorCode: "networkError", dataName: "error", data: reason, endpoint: endpoint});
        });
    });
}

/** Call endpoint with payload.
 *
 * Use this to call a series of endpoints. Returns true if next call is safe. Data and errors are still reported to stores and UI will update accordingly.
 * @return Boolean if call succeed.
 */
export const myCheck = async (endpoint: string, init?: RequestInit | undefined): Promise<Boolean> => {
    const resp = await myFetch(endpoint, init);
    return resp.success === "true";
}
