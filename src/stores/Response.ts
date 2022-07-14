/** Channel to send and receive network based updates. */

import { getNextListenerID, ListenerID } from './Listener';

// TODO: Document these
export type ErrorCode = "networkError" | "jsonError" | "parseError" | "invalidAccount";

// TODO: Document these
export type DataName = "sessionData" | "vehicleData" | "dataMap" | "error";

export interface NetworkResponse {
    success: "true" | "false"
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
    listeners.filter(l => l.dataName == response.dataName).forEach(l => l.fn(response));
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
