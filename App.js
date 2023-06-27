import { useState, useEffect, useContext } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import SettingsContextProvider, {
  SettingsContext,
} from "./store/settings-context";

import StartScreen from "./screens/StartScreen";
import EquationScreen from "./screens/EquationScreen";
import SummaryScreen from "./screens/SummaryScreen";
import HistoryScreen from "./screens/HistoryScreen";

import Colors from "./styles/colors";
import { getCurrentDate } from "./utils/date";

export default function App() {
  function Root() {
    const settingsCtx = useContext(SettingsContext);
    const [isInitiating, setIsInitiating] = useState(true);
    const [stats, setStats] = useState({
      total: 0,
      completed: 0,
      remained: 0,
      correct: 0,
      incorrect: 0,
      testResult: 0,
      startDate: null,
      endDate: null,
      duration: null,
    });

    function initStats(total) {
      setStats({
        total: total,
        completed: 0,
        remained: total,
        correct: 0,
        incorrect: 0,
        testResult: 0,
        startDate: getCurrentDate(),
        endDate: null,
        duration: null,
      });
    }
    function updateStats(isCorrect) {
      setStats((prevState) => {
        const completed = prevState.completed + 1;
        const remained = prevState.remained - 1;
        const correct = isCorrect ? prevState.correct + 1 : prevState.correct;
        const incorrect = completed - correct;
        const testResult =
          completed > 0 ? (correct / completed).toFixed(4) : "-";
        return {
          ...prevState,
          completed,
          remained,
          correct,
          incorrect,
          testResult,
        };
      });
    }
    function updateStatsItem(name, value) {
      setStats((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    }

    useEffect(() => {
      async function getSettings() {
        const storedResultLimit = await AsyncStorage.getItem("resultLimit");
        if (storedResultLimit)
          settingsCtx.setResultLimit(parseInt(storedResultLimit));

        const storedEquationNumber = await AsyncStorage.getItem(
          "equationNumber"
        );
        if (storedEquationNumber)
          settingsCtx.setEquationNumber(parseInt(storedEquationNumber));

        const storedMathOperations = await AsyncStorage.getItem(
          "mathOperations"
        );
        if (storedMathOperations)
          settingsCtx.setMathOperations(storedMathOperations);

        const storedTestPassingCriteria = await AsyncStorage.getItem(
          "testPassingCriteria"
        );
        if (storedTestPassingCriteria)
          settingsCtx.setTestPassingCriteria(
            parseInt(storedTestPassingCriteria)
          );

        const storedResultOnly = await AsyncStorage.getItem("resultOnly");
        if (storedResultOnly)
          settingsCtx.setResultOnly(storedResultOnly === "true");

        setIsInitiating(false);
      }

      getSettings();
    }, []);

    const [view, setView] = useState(0);

    if (isInitiating) {
      return <></>;
    }

    let screen = <StartScreen onViewChange={setView} />;
    if (view === 1) {
      screen = (
        <EquationScreen
          onViewChange={setView}
          stats={stats}
          onInitStats={initStats}
          onUpdateStats={(isCorrect) => updateStats(isCorrect)}
          onUpdateStatsItem={updateStatsItem}
        />
      );
    }
    if (view === 2) {
      screen = <SummaryScreen onViewChange={setView} stats={stats} />;
    }
    if (view === 9) {
      screen = <HistoryScreen onViewChange={setView} stats={stats} />;
    }

    // function startTestHandle() {
    //   setView(1);
    // }

    // console.log("stats", stats);

    return screen;
  }

  return (
    <>
      <StatusBar style="light" />
      <SettingsContextProvider>
        <SafeAreaView style={styles.rootScreen}>
          <Root />
        </SafeAreaView>
      </SettingsContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: Colors.primary700,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
