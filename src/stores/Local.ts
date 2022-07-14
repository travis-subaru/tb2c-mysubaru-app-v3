/**
 * Simple API for posting and receiving changes
 *
 * TODO: Multiple backends (in-memory, on-disk, secure keychain)
 * */

import { getNextListenerID, ListenerID } from './Listener';

export type ListenerKey = "appState" | "environment" | "invalidVINs" | "language" | "languageData";

interface Listener {
    id: ListenerID
    key: ListenerKey
    fn: (any) => void
}

let store = {};
let listeners: Listener[] = [];

/** Begin listening for changes to a specific key.
 *
 *  May reply immediately if key already has data. */
 export const addListener = (key: ListenerKey, handler: (data: any) => void): ListenerID => {
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
export const getItem = (key: ListenerKey): any => {
    return store[key];
}

/** Set key to new value, and notify all listeners. */
export const setItem = (key: ListenerKey, value: any) => {
    store[key] = value;
    listeners.filter(l => l.key == key).forEach(l => l.fn(value));
}

/** Set initial value for key, and notify all listeners. */
export const setInitialValue = (key: ListenerKey, value: any) => {
    if (!store[key]) {
        store[key] = value;
    }
    listeners.filter(l => l.key == key).forEach(l => l.fn(value));
}


// TODO: Should react-isms go to a separate file?

import { useEffect, useState } from 'react';

/** React-friendly wrapper for stored data */
export const useItem = (key: ListenerKey) => {
    const [get, set] = useState(getItem(key));
    useEffect(() => {
        const id = addListener(key, (data) => set(data));
        return () => removeListener(id);
    });
    return get;
}
