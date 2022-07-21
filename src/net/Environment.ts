import { getItem, setItem } from "../stores/Local";

export type NETEnvironmentID = "local8080" | "local8084" | "cloudqa" | "cloudprod" | "clouddr" | "demo";

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
    demo: { env: "demo", domain: "" },
}

export const getEnviroment = (): NETEnvironment => {
    const env: NETEnvironmentID = getItem('environment') ?? "cloudqa"
    return environments[env];
}

export const setEnvironment = (id: NETEnvironmentID) => {
    setItem("environment", id);
}
