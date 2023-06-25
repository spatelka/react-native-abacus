import { View, StyleSheet } from "react-native";

import GlobalStyles from "../../styles/styles";

function Card({ children, width }) {
  return <View style={[styles.container, { width: width }]}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: GlobalStyles.cardSettings.backgroundColor,
    borderRadius: GlobalStyles.cardSettings.borderRadius,
    marginVertical: GlobalStyles.cardSettings.marginVertical,
    marginHorizontal: GlobalStyles.cardSettings.marginHorizontal,
    padding: GlobalStyles.cardSettings.padding,
  },
});
