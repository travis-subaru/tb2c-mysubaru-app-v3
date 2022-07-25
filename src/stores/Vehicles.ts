/** Channel to send and receive updated vehicle info. */

import { getNextListenerID, ListenerID } from './Listener';

// ????: Need types
export interface Customer {
    sessionCustomer: null,
    email: null,
    firstName: null,
    lastName: null,
    zip: null,
    oemCustId: null,
    phone: null
}

// ????: Need types
export interface Vehicle {
    customer: Customer,
    features: string[],
    vin: string,
    modelYear: string | null,
    modelCode: string | null,
    engineSize: number | null,
    nickname: string | null,
    vehicleKey: number,
    active: boolean,
    licensePlate: string,
    licensePlateState: string,
    email: string | null,
    firstName: string | null,
    lastName: string | null,
    subscriptionFeatures: string[],
    accessLevel: number,
    zip: string | null,
    oemCustId: string,
    vehicleMileage: null,
    phone: null,
    timeZone: string,
    stolenVehicle: boolean,
    vehicleName: string,
    userOemCustId: string,
    subscriptionStatus: string | null,
    authorizedVehicle: false,
    preferredDealer: null,
    cachedStateCode: string | null,
    subscriptionPlans: [], // ????: Need structure
    crmRightToRepair: boolean,
    needMileagePrompt: boolean,
    phev: null,
    extDescrip: string | null,
    intDescrip: string | null,
    modelName: string | null,
    transCode: string | null,
    provisioned: boolean,
    remoteServicePinExist: boolean,
    needEmergencyContactPrompt: boolean,
    vehicleGeoPosition: null,
    show3gSunsetBanner: boolean,
    sunsetUpgraded: boolean
}

interface VehicleListener {
    id: ListenerID,
    fn: (store: Vehicle[]) => void,
}

let store: Vehicle[] = [];
let listeners: VehicleListener[] = [];

export const updateVehicle = (v: Vehicle) => {
    const index = store.map(v => v.vin).indexOf(v.vin);
    if (index) {
        store[index] = v;
    } else {
        store.push(v);
    }
    listeners.forEach(l => l.fn(store));
}

/** Begin listening for changes to vehicle data.
 *
 *  Replies immediately with current data */
export const addVehicleListener = (handler: (store: Vehicle[]) => void): ListenerID => {
    const id: ListenerID = getNextListenerID();
    listeners.push({ id: id, fn: handler })
    handler(store);
    return id;
}

/** Stop receiving vehicle updates. */
export const removeVehicleListener = (id: ListenerID): void => {
    listeners = listeners.filter((l) => l.id != id);
}

/** Network monitors */

import { addResponseListener } from './Response';

addResponseListener("vehicleData", (response) => {
    if (response.data.vin) { // Sanity check this is a vehicle
        updateVehicle(response.data);
    }
});

// TODO: Should react-isms go to a separate file?

import { useEffect, useState } from 'react';

/** React-friendly wrapper for stored data */
export const useVehicles = (): Vehicle[] => {
    const [get, set] = useState(store);
    useEffect(() => {
        const id = addVehicleListener((data) => set(data));
        return () => removeVehicleListener(id);
    });
    return get;
}



