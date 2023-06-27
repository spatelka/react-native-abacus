function getAdditionEquation(resultLimit) {
  const result = Math.floor(Math.random() * resultLimit);
  const arg1 = Math.floor(Math.random() * result);
  const arg2 = result - arg1;

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
  // const result = Math.floor(Math.random() * resultLimit);
  const arg1 = Math.floor(Math.random() * factor + 1) + 1;
  const arg2 = Math.floor(Math.random() * Math.floor(resultLimit / arg1));
  const result = arg1 * arg2;

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
  const { equationNumber, resultLimit, mathOperations, resultOnly } = equationParams;
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
