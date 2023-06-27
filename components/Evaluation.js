import { View, Text, StyleSheet } from "react-native";

import GlobalStyles from "../styles/styles";
import Colors from "../styles/colors";

function Evaluation({ equation }) {
  const backgroundColor = equation.isCorrect
    ? Colors.correct
    : Colors.incorrect;

  return (
    <View>
      <View style={styles.evaluationContainer}>
        <Text style={GlobalStyles.title}>Twój wynik:</Text>
        <View
          style={{
            ...styles.answerContainer,
            backgroundColor: backgroundColor,
          }}
        >
          <Text style={styles.answer}>{equation.answer}</Text>
        </View>
      </View>
    </View>
  );
}

export default Evaluation;

const styles = StyleSheet.create({
  evaluationContainer: {
    flexDirection: "row",
    margin: 8,
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  answerContainer: {
    marginHorizontal: 12,
    padding: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  answer: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.accent100,
  },
});
