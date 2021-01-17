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
    default:
      return state;
  }
};
