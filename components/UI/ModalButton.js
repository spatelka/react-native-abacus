import { Pressable, Text, StyleSheet } from "react-native";
import Colors from "../../styles/colors";

function ModalButton({ label, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.textStyle}>{label}</Text>
    </Pressable>
  );
}

export default ModalButton;

const styles = StyleSheet.create({
  button: {
    // marginVertical: 8,
    marginHorizontal: 8,
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.primary500,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
