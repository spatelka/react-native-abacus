import { useContext } from "react";

import { View, Text, StyleSheet, ScrollView } from "react-native";

import GlobalStyles from "../styles/styles";
import Select from "../components/UI/Select";
import CheckboxList from "../components/UI/CheckboxList";
import CheckboxItem from "../components/UI/CheckboxItem";
import PrimaryButton from "../components/UI/PrimaryButton";

import { SettingsContext } from "../store/settings-context";

import {
  equationNumberList,
  resultLimitRangeList,
  mathOperationList,
  testPassingCriteriaList,
} from "../data/dictionaries";
import IconButton from "../components/UI/IconButton";
import Colors from "../styles/colors";

function StartScreen({ onViewChange }) {
  const settingsCtx = useContext(SettingsContext);

  function onSelectResultLimitHandle(id) {
    settingsCtx.setResultLimit(id);
  }

  function onSelectEquationNumberHandle(id) {
    settingsCtx.setEquationNumber(id);
  }

  const isButtonVisible =
    settingsCtx.mathOperations.filter((item) => item).length > 0;

  return (
    <ScrollView>
      <View>
        <View style={styles.headerContainer}>
          <View style={{ width: "20%" }}></View>
          <View style={styles.headerItem}>
            <Text style={GlobalStyles.label}>Abacus</Text>
          </View>
          <View style={{ width: "20%" }}>
            <IconButton
              icon="stats-chart-outline"
              color={Colors.accent100}
              size={24}
              onPress={() => onViewChange(9)}
            />
          </View>
        </View>
      </View>

      <View style={styles.rootContainer}>
        <Select
          width={250}
          label="Zakres działań"
          dictionary={resultLimitRangeList}
          init={settingsCtx.resultLimit}
          onSelect={onSelectResultLimitHandle}
        />
        <Select
          width={250}
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
        <CheckboxItem
          label={"Wyliczaj tylko wynik"}
          isChecked={settingsCtx.resultOnly}
          onUpdate={settingsCtx.setResultOnly}
        />
        <Select
          width={250}
          label="Kryterium zaliczenia [%]"
          dictionary={testPassingCriteriaList}
          init={settingsCtx.testPassingCriteria}
          onSelect={(id) => settingsCtx.setTestPassingCriteria(id)}
        />
        {isButtonVisible && (
          <PrimaryButton width={150} onPress={() => onViewChange(1)}>
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
    // marginTop: 60,
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerItem: {
    justifyContent: "center"
  }
});
