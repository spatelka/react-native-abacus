import { View, Text, StyleSheet } from "react-native";

import GlobalStyles from "../styles/styles";
import Colors from "../styles/colors";
import Icon from "./UI/Icon";

function Statistics({ stats }) {
  const completedPerc =
    stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0;
  const correctPerc =
    stats.completed > 0
      ? ((stats.correct / stats.completed) * 100).toFixed(1)
      : 0;
  const incorrectPerc =
    stats.completed > 0 ? ((stats.incorrect / stats.completed) * 100).toFixed(1) : 0;

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsItem}>
        <Icon icon={"calculator-outline"} size={24} color={Colors.accent100} />
        <Text style={GlobalStyles.subtitle}>
          {stats.completed}/{stats.total} ({completedPerc}%)
        </Text>
      </View>
      <View style={styles.statsItem}>
        <Icon icon={"happy-outline"} size={24} color={Colors.correct} />
        <Text style={GlobalStyles.subtitle}>
          {stats.correct} ({correctPerc}%)
        </Text>
      </View>
      <View style={styles.statsItem}>
        <Icon icon={"sad-outline"} size={24} color={Colors.incorrect} />
        <Text style={GlobalStyles.subtitle}>
          {stats.incorrect} ({incorrectPerc}%)
        </Text>
      </View>
    </View>
  );
}

export default Statistics;

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginHorizontal: 4,
  },
});
