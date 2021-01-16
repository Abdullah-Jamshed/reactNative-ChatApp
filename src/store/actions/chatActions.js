const chatPartnerUIDAction = (uid) => {
  return (dispatch) => {
    dispatch({type: 'CHAT_WITH_UID', payload: {uid}});
  };
};

//   const initializationAction = (flag) => {
//     return (dispatch) => {
//       dispatch({type: 'INITIALIZATION', payload: {flag}});
//     };
//   };

export {chatPartnerUIDAction};
