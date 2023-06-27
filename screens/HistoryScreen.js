import { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ToastAndroid, FlatList } from "react-native";

import { SettingsContext } from "../store/settings-context";
import GlobalStyles from "../styles/styles";

import ModalWindow from "../components/UI/ModalWindow";
import PrimaryButton from "../components/UI/PrimaryButton";
import Card from "../components/UI/Card";
import Colors from "../styles/colors";
import { dateToString, durationToString } from "../utils/date";
import { testPassingCriteriaList } from "../data/dictionaries";

function HistoryScreen({ onViewChange }) {
  const settingsCtx = useContext(SettingsContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    settingsCtx.getHistoryList();
  }, []);

  useEffect(() => {
    console.log("useEffect 2");
    setHistoryList(settingsCtx.historyList);
  }, [settingsCtx.historyList]);

  function onModalWindowCloseHandler(status) {
    setIsModalVisible(false);
    if (status === 1) {
      settingsCtx.cleanHistoryList();
      ToastAndroid.showWithGravity(
        "Historia została usunięta!",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  }

  //   const criteria =
  //     testPassingCriteriaList[settingsCtx.testPassingCriteria].value;
  //   const testResult = stats.testResult * 100;
  //   const isPassed = testResult >= criteria;

    function renderHistoryItem(itemData) {
      function pressHandler(image) {
        console.log(id)
        // navigation.navigate("AlbumDetails", {
        //   albumId: itemData.item.id,
        //   image: image,
        // });
      }

      return (
        <View>
          <Text>{itemData.item.startDate}</Text>
        </View>
        // <AlbumTile
        //   id={itemData.item.id}
        //   title={itemData.item.title}
        //   onPress={pressHandler}
        // />
      );
    }

  console.log("historyList size", historyList.length);
  console.log("historyList", historyList);

  return (
    <View style={styles.rootContainer}>
      <ModalWindow
        isVisible={isModalVisible}
        type={"yesno"}
        onClose={onModalWindowCloseHandler}
      >
        <Text style={GlobalStyles.modalText}>
          Czy na pewno usunąć historię?
        </Text>
      </ModalWindow>

      <Text style={GlobalStyles.label}>Historia</Text>
      {/* <Card width={300}>

      </Card> */}
      <View>
        <FlatList
          data={historyList}
          keyExtractor={(item) => item.startDate}
          renderItem={renderHistoryItem}
        />
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton width={100} onPress={() => onViewChange(0)}>
          Wróć
        </PrimaryButton>
        <PrimaryButton width={100} onPress={() => setIsModalVisible(true)}>
          Usuń historię
        </PrimaryButton>
      </View>
    </View>
  );
}

export default HistoryScreen;

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
