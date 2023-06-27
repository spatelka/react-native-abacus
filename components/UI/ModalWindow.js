import { Pressable, View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { GlobalStyles } from "../../styles/styles";
import Colors from "../../styles/colors";
import ModalButton from "./ModalButton";

function ModalWindow({ children, isVisible, type, onClose }) {
  return (
    <Modal
      backdropOpacity={0.5}
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={"left"}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>{children}</View>
          <View>
            {type === "ok" && (
              <View>
                <ModalButton label={"OK"} onPress={() => onClose(0)} />
              </View>
            )}
            {type === "yesno" && (
              <View style={styles.buttonContainer}>
                <ModalButton label={"Tak"} onPress={() => onClose(1)} />
                <ModalButton label={"Nie"} onPress={() => onClose(2)} />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalWindow;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 8,
    backgroundColor: Colors.accent100,
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 16,
    justifyContent: "space-between",
  },
});
