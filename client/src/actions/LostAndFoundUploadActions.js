import * as lfUploadApi from '../api/LostAndFoundUploadRequest'

export const uploadLostAndFoundImage = (data) => async (dispatch) => {
    try {
      await lfUploadApi.uploadLostAndFoundImage(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  export const uploadLostAndFoundPost = (data) => async (dispatch) => {
    dispatch({ type: "LF_UPLOAD_START" });
    try {
      const newLostFound = await lfUploadApi.uploadLostAndFoundPost(data);
      dispatch({ type: "LF_UPLOAD_SUCCESS", data: newLostFound.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LF_UPLOAD_FAIL" });
    }
  };
