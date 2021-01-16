const INITIAL_STATE = {
  chatPartner: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHAT_WITH_UID':
      return {
        ...state,
        chatPartner: action.payload.charPartner,
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
