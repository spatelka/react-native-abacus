import { View, Text, Pressable, StyleSheet } from "react-native";

import Colors from "../../styles/colors";

function PrimaryButton({ children, width, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonInnerContainer,
          pressed && styles.pressed,
          { width: width },
        ]}
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    // width: 150,
    // alignItems: "center",
    borderRadius: 28,
    // height: 60,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    height: 50,
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    justifyContent: 'center',
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
