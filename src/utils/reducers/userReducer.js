export const actionType = {
  SET_USER: 'SET_USER',
  // other action types
};

const userReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    // other cases
    default:
      return state;
  }
};

export default userReducer;
