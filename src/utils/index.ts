export const shuffle = <T extends unknown>(array: T[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const OPERATORS = ["+", "-", "x"];

export const createCalcul = () => {
  const opA = Math.floor(Math.random() * 100);
  const opB = Math.floor(Math.random() * 100);
  const opC = Math.floor(Math.random() * 3);

  let result;
  switch (opC) {
    case 0:
      result = opA + opB;
      break;
    case 1:
      result = opA - opB;
      break;
    case 2:
    default:
      result = opA * opB;
  }
  return { calcul: `${opA} ${OPERATORS[opC]} ${opB} = ?`, result };
};
