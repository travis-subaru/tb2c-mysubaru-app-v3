import { getItem } from "../stores/Local";

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

export const getEnviroment = (): NETEnvironment => {
    const env: NETEnvironmentID = getItem('environment') ?? "cloudqa"
    return environments[env];
}
