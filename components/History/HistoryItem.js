import { Pressable, View, Text, StyleSheet } from "react-native";

import { dateToString } from "../../utils/date";
import Card from "../UI/Card";
import Colors from "../../styles/colors";

function HistoryItem({ history, testCriteria, onPress }) {
  const testResult = history.testResult * 100;
  const isPassed = testResult >= testCriteria;
  return (
    <Pressable onPress={onPress}>
      <Card width={300}>
        <View>
          <View style={styles.container}>
            <Text>{dateToString(history.startDate)}</Text>
            <Text
              style={{ color: isPassed ? Colors.correct : Colors.incorrect }}
            >
              {history.correct}/{history.total} (
              {(history.testResult * 100).toFixed(0)}%)
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

export default HistoryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 4,
  },
});
