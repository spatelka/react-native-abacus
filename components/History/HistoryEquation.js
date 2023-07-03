import { View, Text, StyleSheet } from "react-native";

import Colors from "../../styles/colors";
import Card from "../UI/Card";

function HistoryEquation({ equation }) {
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

  const setArg = (isGuessed, number, answer, isCorrect) => {
    if (!isGuessed || isCorrect) return number;
    return `${answer} [${number}]`;
  };

  const setStyle = (isGuessed, isCorrect) => {
    if (!isGuessed) return;
    if (isCorrect) return { color: Colors.correct };
    return { color: Colors.incorrect };
  };

  let args = [];
  args.push({
    value: setArg(
      equation.guessNumber === 0,
      equation.result,
      equation.answer,
      equation.isCorrect
    ),
    style: setStyle(equation.guessNumber === 0, equation.isCorrect),
  });
  args.push({
    value: setArg(
      equation.guessNumber === 1,
      equation.arg1,
      equation.answer,
      equation.isCorrect
    ),
    style: setStyle(equation.guessNumber === 1, equation.isCorrect),
  });
  args.push({
    value: setArg(
      equation.guessNumber === 2,
      equation.arg2,
      equation.answer,
      equation.isCorrect
    ),
    style: setStyle(equation.guessNumber === 2, equation.isCorrect),
  });

  return (
    <View style={styles.rootContainer}>
      <Card width={50}>
        <View>
          <Text style={styles.equationId}>{equation.key + 1}.</Text>
        </View>
      </Card>
      <Card width={240}>
        <View style={styles.equationContainer}>
          <Text style={[styles.equationText, args[1].style]}>
            {args[1].value}
          </Text>
          <Text style={styles.equationText}>{operation}</Text>
          <Text style={[styles.equationText, args[2].style]}>
            {args[2].value}
          </Text>
          <Text style={styles.equationText}>=</Text>
          <Text style={[styles.equationText, args[0].style]}>
            {args[0].value}
          </Text>
        </View>
      </Card>
    </View>
  );
}

export default HistoryEquation;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
  },
  equationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    marginHorizontal: 6,
    padding: 2,
  },
  equationId: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  equationText: {
    fontSize: 16,
    paddingHorizontal: 2,
  },
});
