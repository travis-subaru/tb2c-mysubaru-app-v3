import { getNextListenerID, ListenerID } from './Listener';
import { useState, useEffect } from 'react';

/** Channel to send and receive network based updates. */

// TODO: Document these
export type ErrorCode = "networkError" | "statusError" | "jsonError" | "parseError" | "invalidAccount";

// TODO: Document these
export type DataName = "sessionData" | "vehicleData" | "dataMap" | "error" | "remoteServiceStatus";

export interface NetworkResponse {
    success: boolean
    errorCode: null | ErrorCode
    dataName: null | DataName
    data: any
    endpoint?: string
}

interface NetworkResponseListener {
    id: ListenerID
    dataName?: DataName
    fn: (NETResponse) => void
}

export interface NetworkActivity {
    status: "progress" | "success" | "error"
    tag: string
}

interface NetworkActivityListener {
    id: ListenerID
    fn: (NetworkActivity) => void
}

let activityListeners: NetworkActivityListener[] = [];
let responseListeners: NetworkResponseListener[] = [];

export const postNetworkRequest = (endpoint: string) => {
    const activity: NetworkActivity = {status: "progress", tag: endpoint};
    activityListeners.forEach(l => l.fn(activity));
}

export const postNetworkResponse = (response: NetworkResponse) => {
    const activity: NetworkActivity = {status: response.success ? "success" : "error", tag: response.success ? "ok" : response.errorCode ?? "generalError"};
    activityListeners.forEach(l => l.fn(activity));
    responseListeners.filter(l => l.dataName === response.dataName).forEach(l => l.fn(response));
}

/** Begin listening for network changes. */
export const addNetworkListener = (dataName: DataName, handler: (data: NetworkResponse) => void): ListenerID => {
    const id: ListenerID = getNextListenerID();
    responseListeners.push({ id: id, dataName: dataName, fn: handler })
    return id;
}

/** Stop receiving network updates. */
export const removeNetworkListener = (id: ListenerID): void => {
    responseListeners = responseListeners.filter((l) => l.id != id);
}

/** Begin listening for network activity (in-progess, success, failure) changes. */
export const addNetworkActivityListener = (handler: (data: NetworkActivity) => void): ListenerID => {
    const id: ListenerID = getNextListenerID();
    activityListeners.push({ id: id, fn: handler })
    return id;
}

/** Stop receiving network updates. */
export const removeNetworkActivityListener = (id: ListenerID): void => {
    activityListeners = activityListeners.filter((l) => l.id != id);
}

/** Listener for network updates */
export const useNetworkActivity = () => {
    const [get, set] = useState(null);
    useEffect(() => {
        const id = addNetworkActivityListener((data) => set(data));
        return () => removeNetworkActivityListener(id);
    });
    return [get, set];
}
