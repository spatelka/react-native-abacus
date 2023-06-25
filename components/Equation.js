import { View, Text, StyleSheet } from "react-native";

import GlobalStyles from "../styles/styles";

function Equation({ equation }) {
  let operation = "+";
  switch (equation.type) {
    case 1:
      operation = "-";
      break;
    case 2:
      operation = "*";
      break;
    case 3:
      operation = "/";
  }

  let emptyStyle = [styles.argumentEmptyContainer];
  if (!!equation.answer) {
    emptyStyle.push(
      equation.isCorrect
        ? GlobalStyles.equationElementCorrect
        : GlobalStyles.equationElementIncorrect
    );
  }

  // console.log("equation", equation);
  return (
    <View style={styles.equationContainer}>
      <Text
        style={
          equation.guessNumber === 1
            ? styles.argumentEmptyContainer
            : styles.argumentContainer
        }
      >
        {equation.guessNumber === 1 && !equation.answer ? "" : equation.arg1}
      </Text>
      <Text style={styles.operationContainer}>{operation}</Text>
      <Text
        style={
          equation.guessNumber === 2
            ? styles.argumentEmptyContainer
            : styles.argumentContainer
        }
      >
        {equation.guessNumber === 2 && !equation.answer ? "" : equation.arg2}
      </Text>
      <Text style={styles.operationContainer}>=</Text>
      <Text
        style={
          equation.guessNumber === 0 ? emptyStyle : styles.argumentContainer
        }
      >
        {equation.guessNumber === 0 && !equation.answer ? "?" : equation.result}
      </Text>
    </View>
  );
}

export default Equation;

const styles = StyleSheet.create({
  equationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    // marginBottom: 10,
    padding: 12,
  },
  argumentContainer: {
    ...GlobalStyles.equationElement,
    ...GlobalStyles.equationElementPrimary,
    ...GlobalStyles.equationArgument,
  },
  argumentEmptyContainer: {
    ...GlobalStyles.equationElement,
    ...GlobalStyles.equationElementEmpty,
    ...GlobalStyles.equationArgument,
  },
  operationContainer: {
    ...GlobalStyles.equationElement,
    ...GlobalStyles.equationElementPrimary,
    ...GlobalStyles.equationOperation,
  },
});
