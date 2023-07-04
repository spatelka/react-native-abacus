import { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";

import { SettingsContext } from "../store/settings-context";

import HistoryDetails from "../components/History/HistoryDetails";
import HistoryList from "../components/History/HistoryList";
import { testPassingCriteriaList } from "../data/dictionaries";

function initLearningLevelSet() {
  return [
    { id: 0, total: 0, correct: 0, levelResult: 0, isPassed: false },
    { id: 1, total: 0, correct: 0, levelResult: 0, isPassed: false },
    { id: 2, total: 0, correct: 0, levelResult: 0, isPassed: false },
    { id: 3, total: 0, correct: 0, levelResult: 0, isPassed: false },
    { id: 4, total: 0, correct: 0, levelResult: 0, isPassed: false },
  ];
}

function HistoryScreen({ onViewChange }) {
  const settingsCtx = useContext(SettingsContext);

  const criteria =
    testPassingCriteriaList[settingsCtx.testPassingCriteria].value;

  const [detailsViewId, setDetailsViewId] = useState(null);
  const [isHistoryRemoved, setIsHistoryRemoved] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [learningLevel, setLearningLevel] = useState(initLearningLevelSet());

  function onBackHandle() {
    onViewChange(0);
  }

  function onHistoryRemovedHandle() {
    settingsCtx.cleanHistoryList();
    setIsHistoryRemoved(true);
    ToastAndroid.showWithGravity(
      "Historia została usunięta!",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  }

  function onItemSelectHandle(id) {
    setDetailsViewId(id);
  }

  function onDetailsBackHandle() {
    setDetailsViewId(null);
  }

  useEffect(() => {
    settingsCtx.getHistoryList();
    if (isHistoryRemoved) {
      setIsHistoryRemoved(false);
    }
  }, [isHistoryRemoved]);

  useEffect(() => {
    setHistoryList(settingsCtx.historyList);
  }, [settingsCtx.historyList]);

  // console.log("historyList", historyList);

  useEffect(() => {
    let level = initLearningLevelSet();
    for (let i = 0; i < historyList.length; i++) {
      for (let j = 0; j < historyList[i].equations.length; j++) {
        level[historyList[i].equations[j].type].total++;
        if (historyList[i].equations[j].isCorrect)
          level[historyList[i].equations[j].type].correct++;
      }
    }

    for (let i = 0; i < 5; i++) {
      const levelResult =
        level[i].total === 0
          ? 0
          : ((level[i].correct / level[i].total) * 100).toFixed(0);
      const isPassed = levelResult >= criteria;
      level[i].levelResult = levelResult;
      level[i].isPassed = isPassed;
      if (i < 4) {
        level[4].total += level[i].total;
        level[4].correct += level[i].correct;
      }
    }
    setLearningLevel(level);
  }, [historyList]);

  return (
    <View style={styles.rootContainer}>
      {detailsViewId === null && (
        <HistoryList
          historyList={historyList}
          testCriteria={criteria}
          learningLevel={learningLevel}
          onBack={onBackHandle}
          onHistoryRemoved={onHistoryRemovedHandle}
          onItemSelect={onItemSelectHandle}
        />
      )}

      {detailsViewId !== null && (
        <HistoryDetails
          history={
            historyList.filter((history) => history.id === detailsViewId)[0]
          }
          testCriteria={criteria}
          onDetailsBack={onDetailsBackHandle}
        />
      )}
    </View>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  statsContainer: {
    width: "100%",
    marginVertical: 16,
    padding: 4,
  },
});
