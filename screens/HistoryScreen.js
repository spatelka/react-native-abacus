import { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";

import { SettingsContext } from "../store/settings-context";

import HistoryDetails from "../components/History/HistoryDetails";
import HistoryList from "../components/History/HistoryList";
import { testPassingCriteriaList } from "../data/dictionaries";

function HistoryScreen({ onViewChange }) {
  const settingsCtx = useContext(SettingsContext);

  const criteria =
    testPassingCriteriaList[settingsCtx.testPassingCriteria].value;

  const [detailsViewId, setDetailsViewId] = useState(null);
  const [isHistoryRemoved, setIsHistoryRemoved] = useState(false);
  const [historyList, setHistoryList] = useState([]);

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
    // console.log(id);
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

  return (
    <View style={styles.rootContainer}>
      {detailsViewId === null && (
        <HistoryList
          historyList={historyList}
          testCriteria={criteria}
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
