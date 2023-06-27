import { View, Text, Pressable, StyleSheet } from "react-native";

import Colors from "../../styles/colors";

function PrimaryButton({ children, width, disabled, onPress }) {
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
        <Text style={disabled ? disabled : styles.buttonText}>{children}</Text>
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
    backgroundColor: Colors.primary400,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.accent100,
    textAlign: "center",
  },
  disabled: {
    color: Colors.disabled,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
