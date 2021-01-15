const viewModeAction = (mode) => {
  return (dispatch) => {
    dispatch({type: 'CATEGORY_VIEW', payload: {mode}});
  };
};

const selectedCategoryAction = (category) => {
  console.log(category);
  return (dispatch) => {
    dispatch({type: 'SELECTED_CATEGORY', payload: {category}});
  };
};

export {viewModeAction, selectedCategoryAction};
