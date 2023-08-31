export const actionType = {
  SET_USER: 'SET_USER',
  // other action types
};
const SET_USER_DATA = 'SET_USER_DATA';
const SET_PROFILE_PICTURE = 'SET_PROFILE_PICTURE';
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload };
    case SET_PROFILE_PICTURE:
      return { ...state, photoURL: action.payload };
    default:
      return state;
  }
};
export default userReducer;
