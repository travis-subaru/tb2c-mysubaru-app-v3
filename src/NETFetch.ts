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

export interface SessionData {
    sessionChanged: boolean,
    vehicleInactivated: boolean,
    account: Account,
    resetPassword: boolean,
    // TODO: finish types
    deviceId: "2762148",
    sessionId: "D98180E9E24B3412215CA8BBD0C87DD6",
    deviceRegistered: false,
    passwordToken: "$2a$10$lG75plnGPD8mEOYb3NVK7.qOQlYAgpKVrwA4cOe/KLdoQVndZ1obq",
    vehicles: object[],
    rightToRepairEnabled: true,
    rightToRepairStartYear: 2022,
    rightToRepairStates: "MA",
    termsAndConditionsAccepted: true,
    enableXtime: true,
    digitalGlobeConnectId: "0572e32b-2fcf-4bc8-abe0-1e3da8767132",
    digitalGlobeImageTileService: "https://earthwatch.digitalglobe.com/earthservice/tmsaccess/tms/1.0.0/DigitalGlobe:ImageryTileService@EPSG:3857@png/{z}/{x}/{y}.png?con",
    digitalGlobeTransparentTileService: "https://earthwatch.digitalglobe.com/earthservice/tmsaccess/tms/1.0.0/Digitalglobe:OSMTransparentTMSTileService@EPSG:3857@png/{z}",
    tomtomKey: "E3TldymJMX3RSyqusbUSAewPfkEXaebN",
    currentVehicleIndex: 0,
    handoffToken: "$2a$08$DAUYBx1RNoK.vPDHmKoGluM9I3VjnDGNhEbRMAsOB16EXGU5dLD5K$1657288950612",
    satelliteViewEnabled: true,
    registeredDevicePermanent: false
}

export function parseResponse(json: any): Promise<NETResponse> {
    /**
     * TODO: Parse and validate JSON matches spec, error otherwise
     *       On error, also check response codes (ex: clouddr is currently 501)
     *       In all cases, construct a valid payload and return
     *       {success: "false", errorCode: *something*, dataName: "sessionData", data: null}
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

type RequestID = number
type ListenerID = number

export const startRequest = (endpoint: string, init?: RequestInit | undefined): RequestID => {
    // Start a request object
    // Add to process table
    // Return RequestID
}

export const stopRequest = (id: RequestID): void => {
    // Find process in table
    // Abort request object
}

export const addListener(pattern: number | object, handler: (response: NETResponse) => void): ListenerID => {
    // Add to listener table
    // Return ListenerID
}

export const removeListener(id: ListenerID): void => {
    // Remove listener from table
}

/* Success response sample
{
  "success": true,
  "errorCode": null,
  "dataName": "sessionData",
  "data": {
    "sessionChanged": false,
    "vehicleInactivated": false,
    "account": {
      "createdDate": 1634513804000,
      "marketId": 1,
      "firstName": "Liam",
      "lastName": "Harry",
      "zipCode": "19064",
      "accountKey": 153577,
      "lastLoginDate": 1657288876000,
      "zipCode5": "19064"
    },
    "resetPassword": false,
    "deviceId": "2762148",
    "sessionId": "D98180E9E24B3412215CA8BBD0C87DD6",
    "deviceRegistered": false,
    "passwordToken": "$2a$10$lG75plnGPD8mEOYb3NVK7.qOQlYAgpKVrwA4cOe/KLdoQVndZ1obq",
    "vehicles": [
      {
        "customer": {
          "sessionCustomer": null,
          "email": null,
          "firstName": null,
          "lastName": null,
          "zip": null,
          "oemCustId": null,
          "phone": null
        },
        "features": null,
        "vin": "4S3BMAA66D1038385",
        "modelYear": null,
        "modelCode": null,
        "engineSize": null,
        "nickname": "2013 Legacy 2.5i",
        "vehicleKey": 119677,
        "active": true,
        "licensePlate": "",
        "licensePlateState": "",
        "email": null,
        "firstName": null,
        "lastName": null,
        "subscriptionFeatures": null,
        "accessLevel": -1,
        "zip": null,
        "oemCustId": "CRM-9-TBIJ3VFG",
        "vehicleMileage": null,
        "phone": null,
        "timeZone": "America/New_York",
        "stolenVehicle": false,
        "vehicleName": "2013 Legacy 2.5i",
        "userOemCustId": "CRM-9-TBIJ3VFG",
        "subscriptionStatus": null,
        "authorizedVehicle": false,
        "preferredDealer": null,
        "cachedStateCode": "NJ",
        "subscriptionPlans": [],
        "crmRightToRepair": false,
        "needMileagePrompt": false,
        "phev": null,
        "extDescrip": null,
        "intDescrip": null,
        "modelName": null,
        "transCode": null,
        "provisioned": true,
        "remoteServicePinExist": true,
        "needEmergencyContactPrompt": false,
        "vehicleGeoPosition": null,
        "show3gSunsetBanner": false,
        "sunsetUpgraded": true
      },
      {
        "customer": {
          "sessionCustomer": null,
          "email": null,
          "firstName": null,
          "lastName": null,
          "zip": null,
          "oemCustId": null,
          "phone": null
        },
        "features": null,
        "vin": "4S3GXAT65PA000144",
        "modelYear": null,
        "modelCode": null,
        "engineSize": null,
        "nickname": "impreza144 Gen3",
        "vehicleKey": 11835,
        "active": true,
        "licensePlate": "",
        "licensePlateState": "",
        "email": null,
        "firstName": null,
        "lastName": null,
        "subscriptionFeatures": null,
        "accessLevel": 2,
        "zip": null,
        "oemCustId": "CRM-75UEXK93-N",
        "vehicleMileage": null,
        "phone": null,
        "timeZone": null,
        "stolenVehicle": false,
        "vehicleName": "impreza144 Gen3",
        "userOemCustId": "CRM-476-ZGY18A",
        "subscriptionStatus": null,
        "authorizedVehicle": true,
        "preferredDealer": null,
        "cachedStateCode": "NJ",
        "subscriptionPlans": [],
        "crmRightToRepair": false,
        "needMileagePrompt": false,
        "phev": null,
        "extDescrip": null,
        "intDescrip": null,
        "modelName": null,
        "transCode": null,
        "provisioned": true,
        "remoteServicePinExist": true,
        "needEmergencyContactPrompt": false,
        "vehicleGeoPosition": null,
        "show3gSunsetBanner": false,
        "sunsetUpgraded": true
      },
      {
        "customer": {
          "sessionCustomer": null,
          "email": null,
          "firstName": null,
          "lastName": null,
          "zip": null,
          "oemCustId": null,
          "phone": null
        },
        "features": null,
        "vin": "4S3BMAA62D1013693",
        "modelYear": null,
        "modelCode": null,
        "engineSize": null,
        "nickname": "2022 Legacy 2.5i",
        "vehicleKey": 15295,
        "active": true,
        "licensePlate": "",
        "licensePlateState": "",
        "email": null,
        "firstName": null,
        "lastName": null,
        "subscriptionFeatures": null,
        "accessLevel": 1,
        "zip": null,
        "oemCustId": "CRM-8-ZJTM1PLL",
        "vehicleMileage": null,
        "phone": null,
        "timeZone": null,
        "stolenVehicle": false,
        "vehicleName": "2022 Legacy 2.5i",
        "userOemCustId": "CRM-078-DBN08C",
        "subscriptionStatus": null,
        "authorizedVehicle": true,
        "preferredDealer": null,
        "cachedStateCode": "NJ",
        "subscriptionPlans": [],
        "crmRightToRepair": false,
        "needMileagePrompt": false,
        "phev": null,
        "extDescrip": null,
        "intDescrip": null,
        "modelName": null,
        "transCode": null,
        "provisioned": true,
        "remoteServicePinExist": true,
        "needEmergencyContactPrompt": false,
        "vehicleGeoPosition": null,
        "show3gSunsetBanner": false,
        "sunsetUpgraded": true
      }
    ],
    "rightToRepairEnabled": true,
    "rightToRepairStartYear": 2022,
    "rightToRepairStates": "MA",
    "termsAndConditionsAccepted": true,
    "enableXtime": true,
    "digitalGlobeConnectId": "0572e32b-2fcf-4bc8-abe0-1e3da8767132",
    "digitalGlobeImageTileService": "https://earthwatch.digitalglobe.com/earthservice/tmsaccess/tms/1.0.0/DigitalGlobe:ImageryTileService@EPSG:3857@png/{z}/{x}/{y}.png?con",
    "digitalGlobeTransparentTileService": "https://earthwatch.digitalglobe.com/earthservice/tmsaccess/tms/1.0.0/Digitalglobe:OSMTransparentTMSTileService@EPSG:3857@png/{z}",
    "tomtomKey": "E3TldymJMX3RSyqusbUSAewPfkEXaebN",
    "currentVehicleIndex": 0,
    "handoffToken": "$2a$08$DAUYBx1RNoK.vPDHmKoGluM9I3VjnDGNhEbRMAsOB16EXGU5dLD5K$1657288950612",
    "satelliteViewEnabled": true,
    "registeredDevicePermanent": false
  }
}
*/
