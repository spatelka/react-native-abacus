import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../styles/styles";
import Colors from "../../styles/colors";

const Input = ({ label, invalid, value, onChangeText, onSubmitEditing }) => {
  let inputStyles = [styles.input];

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={inputStyles}
        keyboardType="number-pad"
        maxLength={4}
        textAlign="center"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        value={value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    color: Colors.accent500,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.accent500,
    color: Colors.primary500,
    padding: 6,
    borderRadius: 6,
    fontSize: 24,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: Colors.error500,
  },
  invalidInput: {
    backgroundColor: Colors.error50,
  },
});
