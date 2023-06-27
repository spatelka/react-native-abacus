import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
    borderRadius: 24,
  },
});
