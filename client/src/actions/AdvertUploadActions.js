import * as advertUploadApi from '../api/AdvertUploadRequests'

export const uploadAdvertImage = (data) => async (dispatch) => {
    try {
      await advertUploadApi.uploadAdvertImage(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  export const uploadAdvertPost = (data) => async (dispatch) => {
    dispatch({ type: "ADVERT_UPLOAD_START" });
    try {
      const newAdvert = await advertUploadApi.uploadAdvertPost(data);
      dispatch({ type: "ADVERT_UPLOAD_SUCCESS", data: newAdvert.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ADVERT_UPLOAD_FAIL" });
    }
  };

  export const updateAdvertPost = (adId,data) => async (dispatch) => {
    dispatch({ type: "ADVERT_UPDATE_START" });
    try {
      const updatedAdvert = await advertUploadApi.updateAdvert(adId,data);
      dispatch({ type: "ADVERT_UPDATE_SUCCESS", data: updatedAdvert.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ADVERT_UPDATE_FAIL" });
    }
  };
