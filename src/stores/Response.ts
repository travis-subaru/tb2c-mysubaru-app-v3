/** Channel to send and receive network based updates. */

import { getNextListenerID, ListenerID } from './Listener';

// TODO: Document these
export type ErrorCode = "networkError" | "statusError" | "jsonError" | "parseError" | "invalidAccount";

// TODO: Document these
export type DataName = "sessionData" | "vehicleData" | "dataMap" | "error";

export interface NetworkResponse {
    success: boolean
    errorCode: null | ErrorCode
    dataName: null | DataName
    data: any
    endpoint: string
}

interface NetworkResponseListener {
    id: ListenerID
    dataName: DataName
    fn: (NETResponse) => void
}

let listeners: NetworkResponseListener[] = [];

export const postNetworkResponse = (response: NetworkResponse) => {
    console.log(`Network ${response.success ? "ok" : "ERROR"} :: ${JSON.stringify(response)}`)
    listeners.filter(l => l.dataName === response.dataName).forEach(l => l.fn(response));
}

/** Begin listening for network changes. */
export const addNetworkListener = (dataName: DataName, handler: (data: NetworkResponse) => void): ListenerID => {
    const id: ListenerID = getNextListenerID();
    listeners.push({ id: id, dataName: dataName, fn: handler })
    return id;
}

/** Stop receiving network updates. */
export const removeNetworkListener = (id: ListenerID): void => {
    listeners = listeners.filter((l) => l.id != id);
}
