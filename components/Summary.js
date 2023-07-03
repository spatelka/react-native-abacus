import { View, Text, StyleSheet } from "react-native";

import Colors from "../styles/colors";
import Card from "./UI/Card";
import { dateToString, durationToString } from "../utils/date";

function Summary({ stats }) {
  if (stats === null) {
    return;
  }
  return (
    <Card width={300}>
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text>Zadań:</Text>
          <Text style={{ fontWeight: "bold" }}>{stats.total}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text>Poprawnych:</Text>
          <Text style={{ fontWeight: "bold", color: Colors.correct }}>
            {stats.correct}
          </Text>
        </View>
        <View style={styles.statsItem}>
          <Text>Błędnych:</Text>
          <Text style={{ fontWeight: "bold", color: Colors.incorrect }}>
            {stats.incorrect}
          </Text>
        </View>
        <View style={styles.statsItem}>
          <Text>Wynik testu:</Text>
          <Text
            style={{
              fontWeight: "bold",
              color: stats.isPassed ? Colors.correct : stats.isPassed===false ? Colors.incorrect : null,
            }}
          >
            {stats.testResult * 100}%{" "}
            {stats.isPassed ? "zaliczony" : stats.isPassed===false ? "nie zaliczony" : ""}
          </Text>
        </View>
        <View style={styles.statsItem}>
          <Text>Godzina:</Text>
          <Text>{stats.startDate ? dateToString(stats.startDate) : ""}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text>Czas trwania:</Text>
          <Text>{stats.duration ? durationToString(stats.duration) : ""}</Text>
        </View>
      </View>
    </Card>
  );
}

export default Summary;

const styles = StyleSheet.create({
  statsContainer: {
    width: "100%",
    marginVertical: 16,
    padding: 4,
  },
  statsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 4,
  },
});
