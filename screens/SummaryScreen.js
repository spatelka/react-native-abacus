import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { SettingsContext } from "../store/settings-context";
import GlobalStyles from "../styles/styles";
import PrimaryButton from "../components/UI/PrimaryButton";
import Card from "../components/UI/Card";
import Colors from "../styles/colors";
import { dateToString, durationToString } from "../utils/date";
import { testPassingCriteriaList } from "../data/dictionaries";
import { sendEmail } from '../utils/communication';

function SummaryScreen({ stats, onViewChange }) {
  const settingsCtx = useContext(SettingsContext);
  const criteria =
    testPassingCriteriaList[settingsCtx.testPassingCriteria].value;
  const testResult = stats.testResult * 100;
  const isPassed = testResult >= criteria;

  function handleOkButton() {
    // sendEmail(
    //   "spatelka@gmail.com",
    //   "We need your feedback",
    //   "UserName, we need 2 minutes of your time to fill this quick survey",
    //   { }
    // ).then(() => {
    //   console.log("Your message was successfully sent!");
    // });
    onViewChange(0);
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={GlobalStyles.label}>Podsumowanie</Text>
      <Card width={300}>
        <View style={styles.statsContainer}>
          <View style={styles.statsItem}>
            <Text>Zadań:</Text>
            <Text>{stats.total}</Text>
          </View>
          <View style={styles.statsItem}>
            <Text>Poprawnych:</Text>
            <Text style={{ color: Colors.correct }}>{stats.correct}</Text>
          </View>
          <View style={styles.statsItem}>
            <Text>Błędnych:</Text>
            <Text style={{ color: Colors.incorrect }}>{stats.incorrect}</Text>
          </View>
          <View style={styles.statsItem}>
            <Text>Wynik testu:</Text>
            <Text>
              {stats.testResult * 100}%{" "}
              {isPassed ? "zaliczony" : "nie zaliczony"}{" "}
            </Text>
          </View>
          <View style={styles.statsItem}>
            <Text>Godzina:</Text>
            <Text>{dateToString(stats.startDate)}</Text>
          </View>
          <View style={styles.statsItem}>
            <Text>Czas trwania:</Text>
            <Text>{durationToString(stats.duration)}</Text>
          </View>
        </View>
      </Card>
      <View style={styles.buttonContainer}>
        <PrimaryButton width={100} onPress={handleOkButton}>
          OK
        </PrimaryButton>
      </View>
    </View>
  );
}

export default SummaryScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 80,
    alignItems: "center",
  },
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
  buttonContainer: {
    margin: 16,
  },
});
