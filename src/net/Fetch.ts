import { NetworkResponse, postNetworkRequest, postNetworkResponse } from "../stores/Response";
import { logout } from "../stores/Session";
import { mockResponseForEndpoint } from "./Demo";
import { getEnviroment } from "./Environment";

export function parseResponse(json: any, endpoint: string): Promise<NetworkResponse> {
    return new Promise<NetworkResponse>((resolve, reject) => {
        // Some endpoints return just boolean
        if (json === true || json === false) {
            resolve({success: json, errorCode: null, dataName: null, data: undefined, endpoint: endpoint}); return;
        }
        const success = json["success"] ? true : false;
        // TODO: Validate dataName and errorCode against whitelists
        resolve({success: success, data: json["data"], dataName: json["dataName"], errorCode: json["errorCode"], endpoint: endpoint});
    })
}

export const JSONHeaders: HeadersInit = { "content-type": "application/json" };
export const GETRequest: RequestInit = { headers: {}, body: null, method: "GET" };
export const GETJSONRequest: RequestInit = { headers: JSONHeaders, body: null, method: "GET" };

export interface HTTPStatusErrorResponse { success: false, errorCode: "statusError", dataName: "error", data: { status: number }, endpoint: string }

/** Call endpoint with payload.
 * @return Standard response body
 */
export const myFetch = async (endpoint: string, init?: RequestInit | undefined): Promise<NetworkResponse> => {
    const e = getEnviroment();
    return new Promise<NetworkResponse>((resolve, _) => {
        postNetworkRequest(endpoint, init);
        if (e.env == "demo") {
            /** TODO: Get mocks for
             * Engine Start
             * Engine Stop
             * Lock
             * Unlock
             * Condition
             * Status
            */
            const responseObject = mockResponseForEndpoint(endpoint);
            postNetworkResponse(responseObject);
            resolve(responseObject);
            return;
        }
        // Using .then().catch() pyramids to roll in errors
        fetch(`https://${e.domain}/g2v23/${endpoint}`, init).then((response) => {
                response.json().then((json) => {
                    parseResponse(json, endpoint).then((responseObject) => {
                        postNetworkResponse(responseObject);
                        resolve(responseObject);
                    }).catch((reason) => {
                        const error: NetworkResponse = {success: false, errorCode: "parseError", dataName: "error", data: reason, endpoint: endpoint};
                        postNetworkResponse(error);
                        resolve(error);
                    });
                }).catch((reason) => {
                    if (response.status >= 200 && response.status <= 299) {
                        const error: NetworkResponse = {success: false, errorCode: "jsonError", dataName: "error", data: reason, endpoint: endpoint};
                        postNetworkResponse(error);
                        resolve(error);
                    } else {
                        // Construct a valid payload with response code (ex: clouddr is currently 501) and return
                        const error: HTTPStatusErrorResponse = {success: false, errorCode: "statusError", dataName: "error", data: {status: response.status}, endpoint: endpoint};
                        postNetworkResponse(error);
                        resolve(error);
                        // On 401, also send user back to login
                        // TODO: After keychain is implementated, refresh session and retry request
                        if (error.data.status == 401) {
                            logout(true);
                        }
                    }
                });
        }).catch((reason) => {
            const error: NetworkResponse = {success: false, errorCode: "networkError", dataName: "error", data: reason, endpoint: endpoint};
            postNetworkResponse(error);
            resolve(error);
        });
    });
}

/** Call endpoint with payload.
 *
 * Use this to call a series of endpoints. Returns true if next call is safe. Data and errors are still reported to stores and UI will update accordingly.
 * @return Boolean if call succeeded.
 */
export const myCheck = async (endpoint: string, init?: RequestInit | undefined): Promise<boolean> => {
    const resp = await myFetch(endpoint, init);
    return resp.success == true;
}
