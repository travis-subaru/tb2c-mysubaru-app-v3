export type NETEnvironmentID = "local8080" | "local8084" | "cloudqa" | "cloudprod" | "clouddr";

export interface NETEnvironment {
    env: NETEnvironmentID
    domain: string
}

const environments: { [key in NETEnvironmentID]: NETEnvironment } = {
    local8080: { env: "local8080", domain: "localhost:8080" },
    local8084: { env: "local8084", domain: "localhost:8084" },
    cloudqa: { env: "cloudqa", domain: "mobileapi.qa.subarucs.com" },
    cloudprod: { env: "cloudprod", domain: "mobileapi.prod.subarucs.com" },
    clouddr: { env: "clouddr", domain: "mobileapi.dr-prod.subarucs.com" },
    // TODO: Demo
}

let _env: NETEnvironmentID = "cloudqa";

export const setEnvironment = (name: NETEnvironmentID) => {
    _env = name;
}

export const getEnviroment = (name?: NETEnvironmentID): NETEnvironment => {
    return environments[name ?? _env];
}
