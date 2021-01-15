const INITIAL_STATE = {
  initializing: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'INITIALIZATION':
      return {
        ...state,
        initializing: action.payload.flag,
      };
    default:
      return state;
  }
};
