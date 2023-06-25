import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "../../styles/styles";
import Colors from "../../styles/colors";

function Icon({ icon, size, backgroundColor, color }) {
  return (
    <View style={{ ...styles.iconContainer, backgroundColor: backgroundColor }}>
      <Ionicons name={icon} size={size} color={color} />
    </View>
  );
}

export default Icon;

const styles = StyleSheet.create({
  iconContainer: {
    // backgroundColor: Colors.accent500,
    borderRadius: 24,
    // padding: 2,
    // marginHorizontal: 2,
    // marginVertical: 8,
  },
});
