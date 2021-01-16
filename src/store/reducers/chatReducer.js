const INITIAL_STATE = {
  chatPartnerUID: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHAT_WITH':
      return {
        ...state,
        chatPartnerUID: action.payload.chatPartnerUID,
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
