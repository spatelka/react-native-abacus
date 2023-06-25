import { View, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function Checkbox({ label, isChecked, onChange }) {
  return (
    <View style={styles.checkbox}>
      <BouncyCheckbox
        size={24}
        fillColor="blue"
        unfillColor="#FFFFFF"
        text={label}
        iconStyle={{ borderColor: "blue" }}
        innerIconStyle={{ borderWidth: 2 }}
        isChecked={isChecked}
        textStyle={{ textDecorationLine: "none" }}
        onPress={() => {
          onChange(!isChecked);
        }}
      />
    </View>
  );
}

export default Checkbox;

const styles = StyleSheet.create({
  checkbox: {
    marginHorizontal: 12,
    marginVertical: 4,
    // alignItems: "flex-start",
  },
});
