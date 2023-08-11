const advertReducer = (
    state = {
      adverts: null,
      loading: false,
      error: false,
      uploading: false,
    },
    action
  ) => {
    switch (action.type) {

      // belongs to AdvertShare.jsx
      case "ADVERT_UPLOAD_START":
        return { ...state, error: false, uploading: true };
      case "ADVERT_UPLOAD_SUCCESS":
        return {
          ...state,
          adverts: [action.data, ...state.adverts],
          uploading: false,
          error: false,
        };
      case "ADVERT_UPLOAD_FAIL":
        return { ...state, uploading: false, error: true };

      // belongs to adverts.jsx
      case "ADVERT_FETCH_START":
        return { ...state, loading: true, error: false };
      case "ADVERT_FETCH_SUCCESS":
        return { ...state, adverts: action.data, loading: false, error: false };
      case "ADVERT_FETCH_FAIL":
        return { ...state, loading: false, error: true };

      // belongs to advert AdvertShareModal.jsx
      case "ADVERT_UPDATE_START":
        return { ...state, error: false, uploading: true };
      case "ADVERT_UPDATE_SUCCESS":
        const adverts = [...state.adverts]
        const advertIndex = adverts.findIndex((advert) => advert._id === action.data._id);
        adverts[advertIndex] = action.data;
        return {...state, adverts}
      case "ADVERT_UPDATE_FAIL":
        return { ...state, uploading: false, error: true };
      default:
        return state;
    }
  };
  
  export default advertReducer;
  