// Proposed alternative to MyFetch. Currently unused.

import { DataName, NETResponse } from "./NETFetch";

type RequestID = number

export const startRequest = (endpoint: string, init?: RequestInit | undefined): RequestID => {
    // Start a request object
    // Add to process table
    // Return RequestID
    return 0;
}

export const stopRequest = (id: RequestID): void => {
    // Find process in table
    // Abort request object
}

