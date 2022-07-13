import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';

// Colors are from page 17 of style guide
// NOTE: "Light Background" fails ADA checker (https://adasitecompliance.com/ada-color-contrast-checker/)

export interface Palette { background: string; copyPrimary: string; copySecondary: string; error: string; link: string; buttonPrimary: string; buttonSecondary: string }

/** Always dark. Ignores light/dark mode setting. */
export const staticMidnight = "#1D252C";

/** Always light. Ignores light/dark mode setting. */
export const staticWhite = "#FFF";

const midnightPalette: Palette = {
    background: staticMidnight,
    copyPrimary: staticWhite,
    copySecondary: "#91979A", // Light Grey
    error: "#E95756", // Light Red
    link: "#3A8EEE", // Light Blue
    buttonPrimary: "#1971D4", // Blue
    buttonSecondary: "#3A8EEE", // Light Blue
};

const whitePalette: Palette = {
    background: staticWhite,
    copyPrimary: staticMidnight,
    copySecondary: "#5C6163", // Grey
    error: "#E22828", // Red
    link: "#1971D4", // Blue
    buttonPrimary: "#1971D4", // Blue
    buttonSecondary: "#1971D4", // Blue
};

/** Dynamic version of useColorScheme.
 *
 *  Cycles on setting change.
 */
 export const useColorSchemeDynamic = () => {
    const colorMode = Appearance.getColorScheme();
    const [get, set] = useState(colorMode);
    useEffect(() => {
        const appearanceSubscription = Appearance.addChangeListener(() => {
            set(Appearance.getColorScheme());
        });
        return () => appearanceSubscription.remove();
    });
    return get;
};

export const useColors = () => {
    return useColorSchemeDynamic() === "dark" ? midnightPalette : whitePalette;
}


