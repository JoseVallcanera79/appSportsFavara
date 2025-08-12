export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "addUser":
      return [...state, action.payload];

    case "updateUser":
      return state.map((user) =>
        user.id === action.payload.id ? { ...action.payload } : user
      );

    case "removeUser":
      return state.filter((user) => user.id !== action.payload);

    default:
      return state;
  }
};
