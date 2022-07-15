import { StyleSheet } from 'react-native';

/** Stylesheet for app
 *
 * NOTE: Because colors are dynamic, call useColor() to get relevant values
*/
export const MyStyleSheet = StyleSheet.create({
    boldCopyText: { fontSize: 14, fontWeight: 'bold' },
    bodyText: { fontSize: 14 },
    buttonText: { fontSize: 14, fontWeight: 'bold' },
    fauxNavBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50, width: '100%'},
    fauxNavTitle: { alignment: 'center', },
    headlineText: { fontSize: 32 },
    pressable: { alignItems: 'center', justifyContent: 'center', minWidth: 150, maxWidth: 350, minHeight: 50 },
    roundedEdge: { borderRadius: 5, borderWidth: 1 },
    screenOuter: { flex: 1, alignItems: 'center', justifyContent:'center' },
    screenInner: { flex: 1, alignItems: 'center', justifyContent:'flex-start', paddingHorizontal: 20 },
});
