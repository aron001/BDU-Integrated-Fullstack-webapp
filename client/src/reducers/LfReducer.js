const lfReducer = (
    state = {
      lostAndFounds: null,
      loading: false,
      error: false,
      uploading: false,
    },
    action
  ) => {
    switch (action.type) {
      // belongs to PostShare.jsx
      case "LF_UPLOAD_START":
        return { ...state, error: false, uploading: true };
      case "LF_UPLOAD_SUCCESS":
        return {
          ...state,
          lostAndFounds: [action.data, ...state.lostAndFounds],
          uploading: false,
          error: false,
        };
      case "LF_UPLOAD_FAIL":
        return { ...state, uploading: false, error: true };
      // belongs to Posts.jsx
      case "LF_FETCH_START":
        return { ...state, loading: true, error: false };
      case "LF_FETCH_SUCCESS":
        return { ...state, lostAndFounds: action.data, loading: false, error: false };
      case "LF_FETCH_FAIL":
        return { ...state, loading: false, error: true };
      default:
        return state;
    }
  };
  
  export default lfReducer;
  