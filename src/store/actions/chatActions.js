const chatPartnerAction = (charPartner) => {
  return (dispatch) => {
    dispatch({type: 'CHAT_WITH_UID', payload: {charPartner}});
  };
};
const chattingIDAction = (id) => {
  return (dispatch) => {
    dispatch({type: 'CHATTING_ID', payload: {id}});
  };
};

//   const initializationAction = (flag) => {
//     return (dispatch) => {
//       dispatch({type: 'INITIALIZATION', payload: {flag}});
//     };
//   };

export {chatPartnerAction, chattingIDAction};
