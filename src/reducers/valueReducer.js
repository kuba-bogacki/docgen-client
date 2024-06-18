const initialState = {
  sessionActive: false
};

const userSessionReducer = (state = initialState, action) => {
  if (action.type === "signIn") {
    return {sessionActive: true};
  } else {
    return {sessionActive: false};
  }
};

const reducerComponent = {
  userSessionReducer
};

export default reducerComponent;