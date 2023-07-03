import { createContext, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { dateToString } from "../utils/date";

const setOutputHistoryList = (inputHistoryList) => {
  const list = inputHistoryList.map((history, index) => ({
    id: index,
    stats: {
      ...history.stats,
      startDate: new Date(history.stats.startDate),
      isPassed: null,
    },
    equations: history.equations
  }));
  list.reverse();
  return list;
};

export const SettingsContext = createContext({
  resultLimit: 0,
  setResultLimit: (id) => {},
  equationNumber: 0,
  setEquationNumber: (id) => {},
  mathOperations: [],
  setMathOperations: (opList) => {},
  setMathOperation: (id) => {},
  testPassingCriteria: 0,
  setTestPassingCriteria: (id) => {},
  resultOnly: true,
  setResultOnly: (value) => {},
  historyList: [],
  addHistory: (history) => {},
  cleanHistoryList: () => {},
  getHistoryList: () => {},
});

function SettingsContextProvider({ children }) {
  const [limit, setLimit] = useState(0);
  const [number, setNumber] = useState(0);
  const [operations, setOperations] = useState([false, false, false, false]);
  const [testCriteria, setTestCriteria] = useState(0);
  const [resultOnlyParam, setResultOnlyParam] = useState(true);
  const [history, setHistory] = useState([]);

  function setResultLimit(id) {
    AsyncStorage.setItem("resultLimit", id.toString());
    setLimit(id);
  }
  function setEquationNumber(id) {
    AsyncStorage.setItem("equationNumber", id.toString());
    setNumber(id);
  }

  function setMathOperations(storedMathOperations) {
    setOperations(JSON.parse(storedMathOperations));
  }

  function setMathOperation(id) {
    let tempList = [...operations];
    tempList[id] = !tempList[id];
    setOperations(tempList);
    const mathOpStr = JSON.stringify(tempList);
    AsyncStorage.setItem("mathOperations", mathOpStr);
  }

  function setTestPassingCriteria(id) {
    AsyncStorage.setItem("testPassingCriteria", id.toString());
    setTestCriteria(id);
  }

  function setResultOnly(value) {
    setResultOnlyParam(value);
    AsyncStorage.setItem("resultOnly", value.toString());
  }

  function cleanHistoryList() {
    AsyncStorage.removeItem("history");
  }

  async function getHistoryList() {
    const storedHistory = await AsyncStorage.getItem("history");
    let list = [];
    if (storedHistory) {
      list = JSON.parse(storedHistory);
    }
    setHistory(setOutputHistoryList(list));
  }

  async function addHistory(history) {
    const storedHistory = await AsyncStorage.getItem("history");
    let historyList = [];
    if (storedHistory) {
      historyList = JSON.parse(storedHistory);
    }
    historyList.push(history);
    AsyncStorage.setItem("history", JSON.stringify(historyList));
  }

  const value = {
    resultLimit: limit, // wartosc zakresu dzialan
    setResultLimit: setResultLimit, // ustaw zakres dzialan
    equationNumber: number, // wartosc liczby zadan
    setEquationNumber: setEquationNumber, // ustawienie liczy zadan
    mathOperations: operations, // zestaw aktywnych operacji arytmetycznych
    setMathOperations: setMathOperations, // wczytanie operacji matematycznych z pamieci
    setMathOperation: setMathOperation, // ustawienie aktywnosci wybranej operacji matematycznej
    testPassingCriteria: testCriteria, // kryterium zdania testu
    setTestPassingCriteria: setTestPassingCriteria, // ustawienie kryterium zdania testu
    resultOnly: resultOnlyParam, // czy wyliczany tylko wynik (jesli nie, to wyliczane beda rowniez argumenty)
    setResultOnly: setResultOnly, // ustawienie czy wyliczany tylko wynik (jesli nie, to wyliczane beda rowniez argumenty)
    historyList: history, // historia
    cleanHistoryList: cleanHistoryList, // wyczysc historie
    getHistoryList: getHistoryList, // pobierz historie
    addHistory: addHistory, // dodaj wpis do historii
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsContextProvider;
