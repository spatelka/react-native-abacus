import { View, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Colors from "../../styles/colors";

function Checkbox({ label, isChecked, onChange }) {
  return (
    <View style={styles.checkbox}>
      <BouncyCheckbox
        size={24}
        fillColor={Colors.primary500}
        unfillColor={Colors.accent100}
        text={label}
        iconStyle={{ borderColor: "blue" }}
        innerIconStyle={{ borderWidth: 2 }}
        isChecked={isChecked}
        textStyle={{ textDecorationLine: "none", color: "black" }}
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
  },
});
