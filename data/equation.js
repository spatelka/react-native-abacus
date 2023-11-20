function getAdditionEquation(resultLimit) {
  let result, arg1, arg2;
  do {
    result = 1 + Math.floor(Math.random() * (resultLimit - 1));
    arg1 = 1 + Math.floor(Math.random() * (result - 1));
    arg2 = result - arg1;
  } while (result === 0 || arg1 === 0 || arg2 === 0);

  return {
    type: 0,
    arg1,
    arg2,
    result,
  };
}

function getSubtractionEquation(resultLimit) {
  const eq = getAdditionEquation(resultLimit);

  return {
    type: 1,
    arg1: eq.result,
    arg2: eq.arg1,
    result: eq.arg2,
  };
}

function getMultiplicationEquation(resultLimit) {
  const factor = Math.sqrt(resultLimit);
  let result, arg1, arg2;
  do {
    arg1 = Math.floor(Math.random() * factor + 1) + 1;
    arg2 = Math.floor(Math.random() * Math.floor(resultLimit / arg1));
    result = arg1 * arg2;
  } while (result === 0 || arg1 === 0 || arg2 === 0);

  return {
    type: 2,
    arg1,
    arg2,
    result,
  };
}

function getDivisionEquation(resultLimit) {
  const eq = getMultiplicationEquation(resultLimit);

  return {
    type: 3,
    arg1: eq.result,
    arg2: eq.arg1,
    result: eq.arg2,
  };
}

export function getEquationSet(equationParams) {
  const { equationNumber, resultLimit, mathOperations, resultOnly } =
    equationParams;
  const mathOperationsNumber = mathOperations.length;
  let equationSet = [];
  for (let i = 0; i < equationNumber; i++) {
    const randomMathOperation =
      mathOperationsNumber === 1
        ? 0
        : Math.floor(Math.random() * mathOperationsNumber);
    let equation = {};
    switch (mathOperations[randomMathOperation]) {
      case 1:
        equation = getSubtractionEquation(resultLimit);
        break;
      case 2:
        equation = getMultiplicationEquation(resultLimit);
        break;
      case 3:
        equation = getDivisionEquation(resultLimit);
        break;
      default:
        equation = getAdditionEquation(resultLimit);
    }
    equationSet.push({
      key: i,
      ...equation,
      answer: null,
      guessNumber: resultOnly ? 0 : Math.floor(Math.random() * 3),
      isCorrect: false,
    });
  }

  // console.log("equationSet", equationSet);
  return equationSet;
}
