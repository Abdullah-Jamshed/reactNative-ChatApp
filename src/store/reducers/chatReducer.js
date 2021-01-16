const INITIAL_STATE = {
  chatPartnerUID: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHAT_WITH_UID':
      return {
        ...state,
        chatPartnerUID: action.payload.uid,
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
