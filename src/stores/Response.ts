import { getNextListenerID, ListenerID } from './Listener';
import { useState, useEffect } from 'react';
import { descriptionForErrorCode, ErrorCode } from '../model/Code';
import { descriptionForRemoteServiceStatus, mapEndpointToCommand, RemoteServiceNetworkResponse } from '../net/RemoteCommand';
import { Language } from '../model/Language';
import { HTTPStatusErrorResponse } from '../net/Fetch';

/** Channel to send and receive network based updates. */

// TODO: Remove this type. Replace by unifying NetworkResponse.
export type DataName = "sessionData" | "vehicleData" | "dataMap" | "error";

export interface NetworkRequest {
    endpoint: string
    init?: RequestInit | undefined
}

export interface UnclassifiedNetworkResponse {
    success: boolean
    errorCode: null | ErrorCode
    dataName: null | DataName
    data: any
    endpoint: string
}

export type NetworkResponse = UnclassifiedNetworkResponse | RemoteServiceNetworkResponse | HTTPStatusErrorResponse;

export type NetworkActivity = {type: "request", request: NetworkRequest} | {type: "response", response: NetworkResponse};

interface NetworkActivityListener {
    id: ListenerID
    fn: (NetworkActivity) => void
}

let activityListeners: NetworkActivityListener[] = [];

export const postNetworkRequest = (endpoint: string, init?: RequestInit | undefined) => {
    const activity: NetworkActivity = {type: "request", request: {endpoint: endpoint, init: init}};
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
};

export const normalizeEndpoint = (endpoint: string): string => {
    if (endpoint.includes(";")) { // Remove ;jsessionid=...
        return endpoint.split(";")[0];
    } else {
        return endpoint;
    }
};

export const descriptionForActivity = (i18n: Language, activity: NetworkActivity): string => {
    if (activity.type === "request") {
        const remoteCommand = mapEndpointToCommand(activity.request.endpoint);
        if (remoteCommand) {
            return descriptionForRemoteServiceStatus(i18n, {remoteServiceState: "started", remoteServiceType: remoteCommand});
        } else {
            // TODO: Increase coverage to avoid hitting this
            return `START (ENDPOINT: ${normalizeEndpoint(activity.request.endpoint)})`
        }
    } else {
        const response = activity.response;
        if (activity.response.dataName === "remoteServiceStatus") {
            return descriptionForRemoteServiceStatus(i18n, activity.response.data);
        }
        if (activity.response.errorCode === "statusError") {
            return `${i18n.message.fatalMessage} (HTTP: ${activity.response.data.status})`
        }
        if (activity.response.errorCode != null) {
            return descriptionForErrorCode(i18n, activity.response.errorCode);
        }
        if (activity.response.success) {
            // Catch-all for unhandled successes
            return `${i18n.common.ok} (ENDPOINT: ${normalizeEndpoint(activity.response.endpoint)})`;
        } else {
            // Catch-all for unhandled failures
            return `${i18n.message.fatalMessage} (ENDPOINT: ${normalizeEndpoint(activity.response.endpoint)})`;
        }

    }
};
