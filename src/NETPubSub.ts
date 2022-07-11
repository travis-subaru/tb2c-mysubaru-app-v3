// Proposed alternative to MyFetch. Currently unused.

import { DataName, NETResponse } from "./NETFetch";

type RequestID = number
type ListenerID = number

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

export const addListener(pattern: RequestID | DataName, handler: (response: NETResponse) => void): ListenerID => {
    // Add to listener table
    // Return ListenerID
    return 0;
}

export const removeListener(id: ListenerID): void => {
    // Remove listener from table
}
