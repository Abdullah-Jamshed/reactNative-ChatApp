const userAction = (user) => {
  return (dispatch) => {
    dispatch({type: 'USER', payload: {user}});
  };
};

const initializationAction = (flag) => {
  return (dispatch) => {
    dispatch({type: 'INITIALIZATION', payload: {flag}});
  };
};

export {userAction, initializationAction};
