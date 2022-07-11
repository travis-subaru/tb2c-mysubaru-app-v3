import { getEnviroment } from "./NETEnvironment";

// TODO: Document these
export type ErrorCode = "networkError" | "jsonError" | "parseError" | "invalidAccount";

// TODO: Document these
export type DataName = "sessionData" | "error";

export interface NETResponse {
    success: "true" | "false"
    errorCode: null | ErrorCode
    dataName: null | DataName
    data: null | SessionData
    endpoint: string
}

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

export interface Customer {
    sessionCustomer: null,
    email: null,
    firstName: null,
    lastName: null,
    zip: null,
    oemCustId: null,
    phone: null
}

export interface Vehicle {
    customer: Customer,
    features: null,
    vin: "4S3BMAA66D1038385",
    modelYear: null,
    modelCode: null,
    engineSize: null,
    nickname: "2013 Legacy 2.5i",
    vehicleKey: 119677,
    active: true,
    licensePlate: "",
    licensePlateState: "",
    email: null,
    firstName: null,
    lastName: null,
    subscriptionFeatures: null,
    accessLevel: -1,
    zip: null,
    oemCustId: "CRM-9-TBIJ3VFG",
    vehicleMileage: null,
    phone: null,
    timeZone: "America/New_York",
    stolenVehicle: false,
    vehicleName: "2013 Legacy 2.5i",
    userOemCustId: "CRM-9-TBIJ3VFG",
    subscriptionStatus: null,
    authorizedVehicle: false,
    preferredDealer: null,
    cachedStateCode: "NJ",
    subscriptionPlans: [], // TODO: ???
    crmRightToRepair: false,
    needMileagePrompt: false,
    phev: null,
    extDescrip: null,
    intDescrip: null,
    modelName: null,
    transCode: null,
    provisioned: true,
    remoteServicePinExist: true,
    needEmergencyContactPrompt: false,
    vehicleGeoPosition: null,
    show3gSunsetBanner: false,
    sunsetUpgraded: true
}

export interface SessionData {
    sessionChanged: boolean,
    vehicleInactivated: boolean,
    account: Account,
    resetPassword: boolean,
    deviceId: string,
    sessionId: string,
    deviceRegistered: false,
    passwordToken: string,
    vehicles: Vehicle[],
    rightToRepairEnabled: boolean,
    rightToRepairStartYear: number,
    rightToRepairStates: string,
    termsAndConditionsAccepted: true,
    enableXtime: true,
    digitalGlobeConnectId: string,
    digitalGlobeImageTileService: string,
    digitalGlobeTransparentTileService: string,
    tomtomKey: string,
    currentVehicleIndex: number,
    handoffToken: string,
    satelliteViewEnabled: true,
    registeredDevicePermanent: false
}


export function parseResponse(json: any): Promise<NETResponse> {
    /**
     * TODO: Parse and validate JSON matches spec, error otherwise
     *       On error, also check response codes (ex: clouddr is currently 501)
     *       In all cases, construct a valid payload and return
     *       {success: "false", errorCode: *something*, dataName: "parseError", data: null}
     */
    return new Promise<NETResponse>((resolve, _) => {
        const parsed: NETResponse = json;
        resolve(parsed);
    })
}

export const myFetch = async (endpoint: string, init?: RequestInit | undefined): Promise<NETResponse> => {
    const e = getEnviroment();
    // Using .then().catch() pyramids to roll in errors
    return new Promise<NETResponse>((resolve, _) => {
        fetch(`https://${e.domain}/g2v23/${endpoint}`, init).then((response) => {
            response.json().then((json) => {
                parseResponse(json).then((responseObject) => {
                    resolve(responseObject);  // Success
                }).catch((reason) => {
                    resolve({success: "false", errorCode: "parseError", dataName: "error", data: reason, endpoint: endpoint});
                });;
            }).catch((reason) => {
                resolve({success: "false", errorCode: "jsonError", dataName: "error", data: reason, endpoint: endpoint});
            });
        }).catch((reason) => {
            resolve({success: "false", errorCode: "networkError", dataName: "error", data: reason, endpoint: endpoint});
        });
    });
}


