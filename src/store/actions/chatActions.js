const chatPartnerAction = (charPartner) => {
  return (dispatch) => {
    dispatch({type: 'CHAT_WITH_UID', payload: {charPartner}});
  };
};

//   const initializationAction = (flag) => {
//     return (dispatch) => {
//       dispatch({type: 'INITIALIZATION', payload: {flag}});
//     };
//   };

export {chatPartnerAction};
