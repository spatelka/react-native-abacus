import { FlatList, View, Text, StyleSheet } from "react-native";

import { mathOperationList } from "../../data/dictionaries";
import Card from "../UI/Card";
import Colors from "../../styles/colors";

function HistoryLevel({ learningLevel }) {

  function renderLevelItem(itemData) {
    return (
      <View style={styles.container}>
        <Text>{itemData.item.id === 4 ? "RAZEM" : mathOperationList[itemData.item.id].label}</Text>
        <Text
          style={{
            color: itemData.item.isPassed ? Colors.correct : Colors.incorrect,
          }}
        >
          {itemData.item.correct}/{itemData.item.total} (
          {itemData.item.levelResult}%)
        </Text>
      </View>
    );
  }

  return (
    <Card width={300}>
      <FlatList
        data={learningLevel}
        keyExtractor={(item) => item.id}
        renderItem={renderLevelItem}
      />
    </Card>
  );
}

export default HistoryLevel;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 4,
  },
});
