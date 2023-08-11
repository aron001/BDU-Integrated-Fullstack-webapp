const usersReducer = (
    state={
        users: null,
        loading: false,
        error: false
    }, 
    action
) => {
        switch (action.type) {
    
          // belongs admindashboard.jsx
          case "USERS_FETCH_START":
            return { ...state, loading: true, error: false };
          case "USERS_FETCH_SUCCESS":
            return { ...state, users: action.data, loading: false, error: false };
          case "USERS_FETCH_FAIL":
            return { ...state, loading: false, error: true };
          default:
            return state;
        }
      };
      
      export default usersReducer;
