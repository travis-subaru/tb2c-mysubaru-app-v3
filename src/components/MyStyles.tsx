import { StyleSheet } from 'react-native';

/** Stylesheet for app
 *
 * NOTE: Because colors are dynamic, call useColor() to get relevant values
*/
export const MyStyleSheet = StyleSheet.create({
    boldCopyText: { fontFamily: 'Helvetica Neue', fontSize: 14, fontWeight: 'bold' },
    bodyText: { fontFamily: 'Helvetica Neue', fontSize: 14 },
    buttonText: { fontFamily: 'Helvetica Neue', fontSize: 14, fontWeight: 'bold' },
    headlineText: { fontFamily: 'Helvetica Neue', fontSize: 32 },
    paddingTextInputBottom: { paddingBottom: 20 },
    roundedEdge: { borderRadius: 5 },
});
