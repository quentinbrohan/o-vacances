const initialState = {
  // ici l'état initial
  email: '',
  password: '',
  info: {},
};

const nameForTheReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default: return state;
  }
};

export default nameForTheReducer;
