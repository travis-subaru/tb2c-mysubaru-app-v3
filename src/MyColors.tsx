import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';

// Colors are from page 17 of style guide
// NOTE: "Light Background" fails ADA checker (https://adasitecompliance.com/ada-color-contrast-checker/)

interface Palette { background: string; copyPrimary: string; copySecondary: string; error: string; link: string; buttonPrimary: string; buttonSecondary: string }

const midnight: Palette = {
    background: "#1D252C", // Midnight
    copyPrimary: "#FFF", // White
    copySecondary: "#91979A", // Light Grey
    error: "#E95756", // Light Red
    link: "#3A8EEE", // Light Blue
    buttonPrimary: "#1971D4", // Blue
    buttonSecondary: "#3A8EEE", // Light Blue
};

const white: Palette = {
    background: "#FFF", // White
    copyPrimary: "#1D252C", // Midnight
    copySecondary: "#5C6163", // Grey
    error: "#E22828", // Red
    link: "#1971D4", // Blue
    buttonPrimary: "#1971D4", // Blue
    buttonSecondary: "#1971D4", // Blue
};

function useColors() {
    const initialColors = Appearance.getColorScheme() === "dark" ? midnight : white;
    const [colors, setColors] = useState(initialColors);
    const callback = ({colorScheme}: any) => {
        setColors(colorScheme === "dark" ? midnight : white);
    }
    useEffect(() => {
        const appearanceSubscription = Appearance.addChangeListener(callback);
        return () => appearanceSubscription.remove();
    });
    return colors;
}

export { Palette, useColors };