import { getNextListenerID, ListenerID } from './Listener';
import { useState, useEffect } from 'react';
import { ErrorCode } from '../model/Code';

/** Channel to send and receive network based updates. */

// TODO: Document these
export type DataName = "sessionData" | "vehicleData" | "dataMap" | "error" | "remoteServiceStatus";

export interface NetworkRequest {
    endpoint: string
}


export interface NetworkResponse {
    success: boolean
    errorCode: null | ErrorCode
    dataName: null | DataName
    data: any
    endpoint: string
}

interface NetworkResponseListener {
    id: ListenerID
    dataName?: DataName
    fn: (NETResponse) => void
}

export type NetworkActivity = {type: "request", request: NetworkRequest} | {type: "response", response: NetworkResponse};

interface NetworkActivityListener {
    id: ListenerID
    fn: (NetworkActivity) => void
}

let activityListeners: NetworkActivityListener[] = [];

export const postNetworkRequest = (endpoint: string) => {
    const activity: NetworkActivity = {type: "request", request: {endpoint: endpoint}};
    activityListeners.forEach(l => l.fn(activity));
}

export const postNetworkResponse = (response: NetworkResponse) => {
    const activity: NetworkActivity = {type: "response", response: response};
    activityListeners.forEach(l => l.fn(activity));
}

/** Begin listening for network activity (in-progess, success, failure) changes. */
export const addNetworkActivityListener = (handler: (data: NetworkActivity) => void): ListenerID => {
    const id: ListenerID = getNextListenerID();
    activityListeners.push({ id: id, fn: handler })
    return id;
}

/** Convenience function to listen for specific dataName updates. */
export const addResponseListener = (dataName: DataName, handler: (response: NetworkResponse) => void): ListenerID => {
    const id: ListenerID = getNextListenerID();
    const fn = (data: NetworkActivity) => {
        if (data.type === "response" && data.response.dataName === dataName) {
            handler(data.response)
        }
    }
    activityListeners.push({ id: id, fn: fn })
    return id;
}

/** Stop receiving network updates. */
export const removeNetworkActivityListener = (id: ListenerID): void => {
    activityListeners = activityListeners.filter((l) => l.id != id);
}

/** Listener for network updates */
export const useNetworkActivity = (): [NetworkActivity | null, React.Dispatch<React.SetStateAction<NetworkActivity | null>>] => {
    const [get, set] = useState<NetworkActivity|null>(null);
    useEffect(() => {
        const id = addNetworkActivityListener((data) => set(data));
        return () => removeNetworkActivityListener(id);
    });
    return [get, set];
}
