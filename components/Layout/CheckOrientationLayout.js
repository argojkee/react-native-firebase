// import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
// import { useState, useEffect } from "react";

// export const CheckOrientationLayout = ({ children }) => {
//   const [isPortraitOrientation, setIsPortraitOrientation] = useState(
//     Dimensions.get("window").height > Dimensions.get("window").width
//       ? true
//       : false
//   );

//   useEffect(() => {
//     const checkOrientation = Dimensions.addEventListener("change", () => {
//       if (Dimensions.get("window").height > Dimensions.get("window").width) {
//         setIsPortraitOrientation(true);
//       } else {
//         setIsPortraitOrientation(false);
//       }
//     });

//     return () => {
//       checkOrientation.remove();
//     };
//   });

//   return isPortraitOrientation ? (
//     <View style={styles.container}>{children}</View>
//   ) : (
//     <ScrollView style={styles.container}>{children}</ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: 300,
//   },
// });
