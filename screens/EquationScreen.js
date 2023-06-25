import { useState, useEffect, useContext } from "react";

import { View, Text, StyleSheet } from "react-native";

import { SettingsContext } from "../store/settings-context";
import GlobalStyles from "../styles/styles";
import { getEquationSet } from "../data/equation";
import { equationNumberList, resultLimitRangeList } from "../data/dictionaries";
import PrimaryButton from "../components/UI/PrimaryButton";
import Equation from "../components/Equation";
import Input from "../components/UI/Input";
import ModalWindow from "../components/UI/ModalWindow";
import Evaluation from "../components/Evaluation";
import Statistics from "../components/Statistics";
import { getCurrentDate, setDuration } from "../utils/date";

function EquationScreen({
  onViewChange,
  stats,
  onInitStats,
  onUpdateStats,
  onUpdateStatsItem,
}) {
  const settingsCtx = useContext(SettingsContext);

  function setEquationParams() {
    let mathOps = [];
    settingsCtx.mathOperations.forEach((element, index) => {
      if (element) mathOps.push(index);
    });

    return {
      equationNumber: equationNumberList[settingsCtx.equationNumber].value,
      resultLimit: resultLimitRangeList[settingsCtx.resultLimit].value,
      mathOperations: mathOps,
    };
  }

  const equationParams = setEquationParams();
  const [currEquation, setCurrEquation] = useState(0); // index of current equation
  const [equations, setEquations] = useState([]); // set of equations
  const [value, setValue] = useState(""); // calculated value for current equation
  const [isValueSubmitted, setIsValueSubmitted] = useState(false); // is task completed and submitted
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setEquations(getEquationSet(equationParams));
    onInitStats(equationParams.equationNumber);
  }, []);

  useEffect(() => {
    setValue("");
    if (equations.length > 0) {
      setIsValueSubmitted(!!equations[currEquation].answer);
    } else setIsValueSubmitted(false);
  }, [currEquation]);

  function onModalWindowCloseHandler(status) {
    setIsModalVisible(false);
    if (status === 1) onViewChange(0);
  }

  function onPressCancelButtonHandler() {
    setIsModalVisible(true);
  }
  function onPressFinishButtonHandler() {
    onViewChange(2);
    const endDate = getCurrentDate();
    onUpdateStatsItem("endDate", endDate);
    onUpdateStatsItem("duration", setDuration(stats.startDate, endDate));
  }

  function onPrevEquationButtonHandler() {
    if (currEquation > 0) {
      setCurrEquation((prevState) => prevState - 1);
    }
  }
  function onNextEquationButtonHandler() {
    if (currEquation < equations.length - 1) {
      setCurrEquation((prevState) => prevState + 1);
    }
  }

  let valueToCalculate;
  if (equations.length > 0) {
    switch (equations[currEquation].guessNumber) {
      case 1:
        valueToCalculate = equations[currEquation].arg1;
        break;
      case 2:
        valueToCalculate = equations[currEquation].arg2;
        break;
      default:
        valueToCalculate = equations[currEquation].result;
    }
  }

  const inputChangeHandler = (enteredValue) => {
    setValue(enteredValue);
  };

  const inputSubmitHandler = () => {
    const isCorrect = +value === valueToCalculate;
    setIsValueSubmitted(true);

    let tempEquations = equations;
    tempEquations[currEquation].answer = +value;
    tempEquations[currEquation].isCorrect = isCorrect;
    setEquations(tempEquations);
    onUpdateStats(isCorrect);
  };

  const isTestCompleted = stats.completed === stats.total;

  return (
    <View style={styles.rootContainer}>
      <ModalWindow
        isVisible={isModalVisible}
        type={"yesno"}
        onClose={onModalWindowCloseHandler}
      >
        <Text style={GlobalStyles.modalText}>
          Czy na pewno chcesz przerwać test?
        </Text>
      </ModalWindow>

      <Text style={GlobalStyles.label}>Test</Text>
      <Text style={GlobalStyles.subtitle}>
        Zadanie: {currEquation + 1} / {equations.length}
      </Text>

      <Statistics stats={stats} />

      {equations.length > 0 && <Equation equation={equations[currEquation]} />}

      <View style={styles.answerContainer}>
        {isValueSubmitted ? (
          <Evaluation equation={equations[currEquation]} />
        ) : (
          <Input
            label="Wprowadź wynik:"
            invalid={false}
            value={value}
            onChangeText={inputChangeHandler}
            onSubmitEditing={inputSubmitHandler}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton width={140} onPress={onPrevEquationButtonHandler}>
          Poprzedni
        </PrimaryButton>

        <PrimaryButton width={140} onPress={onNextEquationButtonHandler}>
          Następny
        </PrimaryButton>
      </View>
      <View>
        {!isTestCompleted && (
          <PrimaryButton width={150} onPress={onPressCancelButtonHandler}>
            Anuluj test
          </PrimaryButton>
        )}
        {isTestCompleted && (
          <PrimaryButton width={150} onPress={onPressFinishButtonHandler}>
            Zakończ
          </PrimaryButton>
        )}
      </View>
    </View>
  );
}

export default EquationScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 40,
    alignItems: "center",
  },
  answerContainer: {
    // flex: 1,
    // marginTop: 100,
    // alignItems: "center",
    height: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 16,
    justifyContent: "space-between",
  },
});
