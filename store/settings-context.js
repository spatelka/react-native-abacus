import { createContext, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsContext = createContext({
  reset: () => {},
  resultLimit: 0,
  setResultLimit: (id) => {},
  equationNumber: 0,
  setEquationNumber: (id) => {},
  mathOperations: [],
  setMathOperations: (opList) => {},
  setMathOperation: (id) => {},
  testPassingCriteria: 0,
  setTestPassingCriteria: (id) => {},
});

function SettingsContextProvider({ children }) {
  const [limit, setLimit] = useState(0);
  const [number, setNumber] = useState(0);
  const [operations, setOperations] = useState([false, false, false, false]);
  const [testCriteria, setTestCriteria] = useState(0);

  function reset() {
    console.log("reset");
  }
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

  const value = {
    reset: reset,
    resultLimit: limit, // wartosc zakresu dzialan
    setResultLimit: setResultLimit, // ustaw zakres dzialan
    equationNumber: number, // wartosc liczby zadan
    setEquationNumber: setEquationNumber, // ustawienie liczy zadan
    mathOperations: operations, // zestaw aktywnych operacji arytmetycznych
    setMathOperations: setMathOperations, // wczytanie operacji matematycznych z pamieci
    setMathOperation: setMathOperation, // ustawienie aktywnosci wybranej operacji matematycznej
    testPassingCriteria: testCriteria, // kryterium zdania testu
    setTestPassingCriteria: setTestPassingCriteria, // ustawienie kryterium zdania testu
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsContextProvider;
