const isLetter = (stringChain) => {
  return /^[A-Za-z]*.{3,15}$/.test(stringChain);
};

const isNumber = (stringChain) => {
  return /^[0-9]*.{3,15}$/.test(stringChain);
};

const isEmailValid = (stringChain) => {
  return /\S+@\S+\.\S+/.test(stringChain);
};

const isValidPassword = (stringChain) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(stringChain);
};

const isKrsValid = (stringChain) => {
  return /^[0-9]{10}$/.test(stringChain);
};

const incorrectInputInfo = (className, booleanValue, elementInList, placeholderInfo) => {
  const userInputs = document.getElementsByClassName(className);
  if (booleanValue) {
    userInputs[elementInList].style.borderColor = "red";
    userInputs[elementInList].classList.add("error-placeholder");
    userInputs[elementInList].placeholder = placeholderInfo;
  } else {
    userInputs[elementInList].style.borderColor = "green";
  }
};

const ValidationService = {
  incorrectInputInfo,
  isEmailValid,
  isLetter,
  isNumber,
  isValidPassword,
  isKrsValid
};

export default ValidationService;