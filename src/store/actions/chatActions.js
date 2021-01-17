const chatPartnerAction = (charPartner) => {
  return (dispatch) => {
    dispatch({type: 'CHAT_WITH_UID', payload: {charPartner}});
  };
};

export {chatPartnerAction};
