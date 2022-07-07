import { StyleSheet } from 'react-native';

/** Stylesheet for app 
 * 
 * NOTE: Because colors are dynamic, call useColor() to get relevant values
*/
export const MyStyles = StyleSheet.create({
    pressable: { alignItems: 'center', justifyContent: 'center', minWidth: 150, maxWidth: 350, minHeight: 50 },
    roundedEdge: { borderRadius: 5, borderWidth: 1 },
});
