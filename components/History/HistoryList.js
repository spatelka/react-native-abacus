import { useState } from "react";

import { View, Text, FlatList, StyleSheet } from "react-native";

import GlobalStyles from "../../styles/styles";
import PrimaryButton from "../UI/PrimaryButton";
import ModalWindow from "../UI/ModalWindow";

import HistoryItem from "./HistoryItem";

function HistoryList({
  historyList,
  testCriteria,
  onBack,
  onHistoryRemoved,
  onItemSelect,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function renderHistoryItem(itemData) {
    function pressHandler() {
      onItemSelect(itemData.item.id);
    }

    return (
      <HistoryItem
        history={itemData.item.stats}
        testCriteria={testCriteria}
        onPress={pressHandler}
      />
    );
  }

  function onModalWindowCloseHandler(status) {
    setIsModalVisible(false);
    if (status === 1) {
      onHistoryRemoved();
    }
  }

  return (
    <>
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
      <View style={styles.buttonContainer}>
        <PrimaryButton width={100} onPress={onBack}>
          Wróć
        </PrimaryButton>
        <Text style={GlobalStyles.subtitle}>Wpisów: {historyList.length}</Text>
        <PrimaryButton
          width={100}
          disabled={historyList.length === 0}
          onPress={() => setIsModalVisible(true)}
        >
          Usuń historię
        </PrimaryButton>
      </View>
      <FlatList
        data={historyList}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
      />
    </>
  );
}

export default HistoryList;

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});
