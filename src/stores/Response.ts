import { getNextListenerID, ListenerID } from './Listener';
import { useState, useEffect } from 'react';
import { ErrorCode } from '../model/Code';
import { RemoteServiceNetworkResponse } from '../net/RemoteCommand';
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

export const normalizeEndpoint = (endpoint: string): string => {
    if (endpoint.includes(";")) { // Remove ;jsessionid=...
        return endpoint.split(";")[0];
    } else {
        return endpoint;
    }
};
