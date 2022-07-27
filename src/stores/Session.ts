/** Channel to send and receive updated session data. */
import { getNextListenerID, ListenerID } from "./Listener";
import { addResponseListener } from "./Response"
import { updateVehicle, Vehicle } from "./Vehicles"
import { useEffect, useState } from 'react';
import { setItem } from "./Local";

export interface Account {
    createdDate: number,
    marketId: number,
    firstName: string,
    lastName: string,
    zipCode: string,
    accountKey: number,
    lastLoginDate: number,
    zipCode5: string
}

export interface SessionData {
    sessionChanged: boolean,
    vehicleInactivated: boolean,
    account: Account,
    resetPassword: boolean,
    deviceId: string,
    sessionId: string,
    deviceRegistered: boolean,
    passwordToken: string,
    vehicles: Vehicle[],
    rightToRepairEnabled: boolean,
    rightToRepairStartYear: number,
    rightToRepairStates: string,
    termsAndConditionsAccepted: boolean,
    enableXtime: boolean,
    digitalGlobeConnectId: string,
    digitalGlobeImageTileService: string,
    digitalGlobeTransparentTileService: string,
    tomtomKey: string,
    currentVehicleIndex: number,
    handoffToken: string,
    satelliteViewEnabled: boolean,
    registeredDevicePermanent: false
}

export type Session = SessionData | undefined;

addResponseListener('sessionData', (response) => {
    if (response.data.sessionId && response.data.vehicles) {
        const session: SessionData = response.data; // TODO: Check all keys
        _session = response.data;
        session.vehicles.forEach(v => updateVehicle(v));
        setSession(session);
    }
});

interface SessionListener {
    id: ListenerID,
    fn: (session: Session) => void,
}

let _session: Session = undefined;
let _listeners: SessionListener[] = [];

export const getSessionID = (): string => {
    return _session?.sessionId ?? "";
}

export const setSession = (session: Session) => {
    _session = session;
    _listeners.forEach(l => l.fn(session));
}

/** Begin listening for changes to session data.
 *
 *  Replies immediately with current data. */
export const addSessionListener = (handler: (session: Session) => void): ListenerID => {
    const id: ListenerID = getNextListenerID();
    _listeners.push({ id: id, fn: handler })
    handler(_session);
    return id;
}

/** Stop receiving session updates. */
export const removeSessionListener = (id: ListenerID): void => {
    _listeners = _listeners.filter((l) => l.id != id);
}
/** React-friendly wrapper for stored data */
export const useSession = (): Session => {
    const [get, set] = useState(_session);
    useEffect(() => {
        const id = addSessionListener((data) => set(data));
        return () => removeSessionListener(id);
    });
    return get;
}

// TODO: Cancel all commands on logout

/** End session and go back to login screen. */
export const logout = (sessionTimeout: boolean = false) => {
    setItem("appState", "login");
    setItem("contactInfo", undefined);
    setItem("environment", "cloudqa");
    setItem("sessionTimeout", sessionTimeout);
    setSession(undefined);
}

