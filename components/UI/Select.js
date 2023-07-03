import { View, Text, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

import Card from "./Card";
import GlobalStyles from "../../styles/styles";

function Select({ width, label, dictionary, init, onSelect }) {
  return (
    <Card width={width}>
      <View style={styles.container}>
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
      </View>
    </Card>
  );
}

export default Select;

const styles = StyleSheet.create({
  container: {
    // marginTop: 4,
    // marginBottom: 4,
    marginLeft: 16,
  },
  labelContainer: {
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 8,
  },
  select: {
    width: "90%",
    marginBottom: 4,
  },
});
