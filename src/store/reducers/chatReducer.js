const INITIAL_STATE = {
  chatPartner: null,
  // chattingID: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHAT_WITH_UID':
      return {
        ...state,
        chatPartner: action.payload.charPartner,
      };
    // case 'CHATTING_ID':
    //   return {
    //     ...state,
    //     chattingID: action.payload.id,
    //   };
    default:
      return state;
  }
};
