/**
 * Shared functions to build individual (type-safe) listener channels
 */

export type ListenerID = number;

let sequenceObject: ListenerID = 0;

export const getNextListenerID = (): ListenerID => {
    return sequenceObject++;
}

