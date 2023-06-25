import { useContext } from "react";

import { View, Text, StyleSheet, ScrollView } from "react-native";

import GlobalStyles from "../styles/styles";
import Select from "../components/UI/Select";
import CheckboxList from "../components/UI/CheckboxList";
import PrimaryButton from "../components/UI/PrimaryButton";

import { SettingsContext } from "../store/settings-context";

import {
  equationNumberList,
  resultLimitRangeList,
  mathOperationList,
  testPassingCriteriaList,
} from "../data/dictionaries";

function StartScreen({ onViewChange }) {
  const settingsCtx = useContext(SettingsContext);

  function onSelectResultLimitHandle(id) {
    settingsCtx.setResultLimit(id);
  }

  function onSelectEquationNumberHandle(id) {
    settingsCtx.setEquationNumber(id);
  }

  function onPressButtonHandler() {
    onViewChange();
  }

  const isButtonVisible =
    settingsCtx.mathOperations.filter((item) => item).length > 0;

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <Text style={GlobalStyles.label}>Abacus</Text>
        <Select
          width={150}
          label="Zakres działań"
          dictionary={resultLimitRangeList}
          init={settingsCtx.resultLimit}
          onSelect={onSelectResultLimitHandle}
        />
        <Select
          width={150}
          label="Liczba zadań"
          dictionary={equationNumberList}
          init={settingsCtx.equationNumber}
          onSelect={onSelectEquationNumberHandle}
        />
        <CheckboxList
          dataSet={mathOperationList}
          isCheckedSet={settingsCtx.mathOperations}
          onUpdate={settingsCtx.setMathOperation}
        />
        <Select
          width={250}
          label="Kryterium zaliczenia testu [%]"
          dictionary={testPassingCriteriaList}
          init={settingsCtx.testPassingCriteria}
          onSelect={(id) => settingsCtx.setTestPassingCriteria(id)}
        />
        {isButtonVisible && (
          <PrimaryButton width={150} onPress={onPressButtonHandler}>
            Rozpocznij
          </PrimaryButton>
        )}
      </View>
    </ScrollView>
  );
}

export default StartScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 60,
    alignItems: "center",
    // backgroundColor: Colors.primary500
  },
});
