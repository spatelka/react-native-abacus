import { View, FlatList, Text, StyleSheet } from "react-native";

import GlobalStyles from "../../styles/styles";
import PrimaryButton from "../UI/PrimaryButton";

import Summary from "../Summary";
import HistoryEquation from "./HistoryEquation";

function HistoryDetails({ history, testCriteria, onDetailsBack }) {
  // console.log("HistoryDetails", history);
  if (history === null) return;

  const testResult = history.stats.testResult * 100;
  const isPassed = testResult >= testCriteria;

  function renderHistoryEquation(itemData) {
    return <HistoryEquation equation={itemData.item} />;
  }

  return (
    <>
      <Text style={GlobalStyles.label}>Szczegóły</Text>
      <View style={styles.buttonContainer}>
        <PrimaryButton width={100} onPress={onDetailsBack}>
          Wróć
        </PrimaryButton>
      </View>
      <Summary stats={{ ...history.stats, isPassed: isPassed }} />
      <Text style={GlobalStyles.title}>Obliczenia</Text>

      <FlatList
        data={history.equations}
        keyExtractor={(item) => item.key}
        renderItem={renderHistoryEquation}
      />
    </>
  );
}

export default HistoryDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 4,
  },
  headerContainer: {
    justifyContent: "center",
    marginHorizontal: 12,
    marginTop: 10,
    padding: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});
