import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { SettingsContext } from "../store/settings-context";
import GlobalStyles from "../styles/styles";
import PrimaryButton from "../components/UI/PrimaryButton";
import Summary from "../components/Summary";
import { testPassingCriteriaList } from "../data/dictionaries";
import { sendEmail } from "../utils/communication";

function SummaryScreen({ stats, equations, onViewChange }) {
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
    settingsCtx.addHistory({ stats: stats, equations: equations });
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={GlobalStyles.label}>Podsumowanie</Text>
      <Summary stats={{ ...stats, isPassed: isPassed }} />
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
  buttonContainer: {
    margin: 16,
  },
});
