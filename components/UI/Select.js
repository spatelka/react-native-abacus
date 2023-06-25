import { View, Text, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

import Card from "./Card";
import GlobalStyles from "../../styles/styles";

function Select({ width, label, dictionary, init, onSelect }) {
  return (
    // <View style={[styles.selectContainer, { width: width }]}>
    <Card width={width}>
      <View style={styles.labelContainer}>
        <Text styles={GlobalStyles.label}>{label}</Text>
      </View>
      <View style={styles.select}>
        <SelectList
          setSelected={(val) => onSelect(val)}
          defaultOption={dictionary[init]}
          placeholder="wybierz"
          data={dictionary}
          search={false}
          save="key"
        />
      </View>
    </Card>
    // {/* </View> */}
  );
}

export default Select;

const styles = StyleSheet.create({
//   selectContainer: {
//     // flex:1,
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: GlobalStyles.cardSettings.backgroundColor,
//     borderRadius: GlobalStyles.cardSettings.borderRadius,
//     marginVertical: GlobalStyles.cardSettings.marginVertical,
//     marginHorizontal: GlobalStyles.cardSettings.marginHorizontal,
//     padding: GlobalStyles.cardSettings.padding,
//   },
  labelContainer: {
    // alignItems: "center",
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 8
  },
  select: {
    // margin: 0,
    // padding: 6,
    width: "90%",
    marginBottom: 4
    // overflow: true,
  },
});
