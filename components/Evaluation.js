import { View, Text, StyleSheet } from "react-native";

import GlobalStyles from "../styles/styles";
import Colors from "../styles/colors";
import Icon from "./UI/Icon";

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
        {/* <Icon
          icon={equation.isCorrect ? "happy-outline" : "sad-outline"}
          size={32}
          backgroundColor={equation.isCorrect ? Colors.correct : Colors.incorrect}
          color={"white"}
        /> */}
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
    // alignContent: "center",
    height: 60,
  },
  answerContainer: {
    marginHorizontal: 12,
    padding: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#535322",
    width: 80,
  },
  answer: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
  },
});
