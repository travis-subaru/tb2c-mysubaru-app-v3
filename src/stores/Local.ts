/**
 * Simple API for posting and receiving changes
 *
 * TODO: Multiple backends (in-memory, on-disk, secure keychain)
 * */

import { getNextListenerID, ListenerID } from './Listener';
import { NETEnvironmentID } from '../net/Environment';
import { TwoStepContactInfo } from '../net/TwoStepAuth';
import { LanguageID } from '../model/Language';

export type AppState = 'login' | 'forgot';

export interface LocalData {
    appState: AppState
    environment: NETEnvironmentID
    language: LanguageID
    contactInfo?: TwoStepContactInfo
    pinRequested: boolean
    sessionTimeout: boolean
}

export type LocalDataKey = keyof LocalData;

interface Listener {
    id: ListenerID
    key: LocalDataKey
    fn: (any) => void
}

let store: LocalData = {
    appState: "login",
    environment: "cloudqa",
    language: "en_US",
    pinRequested: false,
    sessionTimeout: false,
};
let listeners: Listener[] = [];

/** Begin listening for changes to a specific key.
 *
 *  May reply immediately if key already has data. */
 export const addListener = (key: LocalDataKey, handler: (data: any) => void): ListenerID => {
    const id: ListenerID = getNextListenerID();
    listeners.push({id: id, key: key, fn: handler})
    const existing = store[key];
    if (existing) {
        handler(existing);
    }
    return id;
}

/** Remove a listener. */
export const removeListener = (id: ListenerID): void => {
    listeners = listeners.filter((l) => l.id != id);
}

/** Return current value of stored key, if present. */
export const getItem = (key: LocalDataKey): any => {
    return store[key];
}

/** Set key to new value, and notify all listeners. */
export const setItem = (key: LocalDataKey, value: any) => {
    // @ts-ignore :: key is already typechecked
    store[key] = value;
    listeners.filter(l => l.key == key).forEach(l => l.fn(value));
}

// TODO: Should react-isms go to a separate file?

import { useEffect, useState } from 'react';

/** React-friendly wrapper for stored data */
export const useItem = (key: LocalDataKey) => {
    const [get, set] = useState(getItem(key));
    useEffect(() => {
        const id = addListener(key, (data) => set(data));
        return () => removeListener(id);
    });
    return get;
}
