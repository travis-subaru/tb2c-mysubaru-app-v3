import React from "react";
import { View } from "react-native";
import { Palette, useColors } from "./MyColors";

export interface MyRuleProps {
    /** Line direction.  */
    direction: "horizontal" | "vertical"
    /** Line thickness. Default is 0.5 (half-pixel) */
    thickness?: number;
    /** Override style as needed */
    style?: any
}

export const MyRule = (props: MyRuleProps) => {
    const Colors: Palette = useColors();
    const thickness = props.thickness ?? 0.5;
    const direction = props.direction === "horizontal" ? { height: thickness, minWidth: '100%' } : { minHeight: '100%', width: thickness };
    return <View style={[{ backgroundColor: Colors.rule }, direction, props.style]}></View>
}
