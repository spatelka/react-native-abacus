import { StyleSheet } from "react-native";
import Colors from "./colors";

const GlobalStyles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.accent500,
  },
  label: {
    fontWeight: "bold",
    fontSize: 36,
    color: Colors.accent500,
  },
  subtitle: {
    margin: 12,
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.accent100,
  },
  modalText: {
    margin: 12,
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.primary500,
  },
  equationElement: {
    margin: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    borderRadius: 8,
  },
  equationElementPrimary: {
    backgroundColor: Colors.accent500,
    color: Colors.primary500,
  },
  equationElementEmpty: {
    backgroundColor: Colors.accent100,
  },
  equationArgument: {
    width: 60,
  },
  equationOperation: {
    width: 40,
  },
  equationElementCorrect: {
    backgroundColor: Colors.correct,
    color: Colors.accent100,
  },
  equationElementIncorrect: {
    backgroundColor: Colors.incorrect,
    color: Colors.accent100,
  },
  cardSettings: {
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 12,
    padding: 8,
    backgroundColor: Colors.background,
  },
});

export default GlobalStyles;
