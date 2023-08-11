import * as LostFoundApi from "../api/LostAndFoundRequests";

export const getAllLostAndFounds = () => async (dispatch) => {
  dispatch({ type: "LF_FETCH_START" });
  try {
    const { data } = await LostFoundApi.getAllLostAndFound();
    console.log("all fetched lostAndFounds are",data);
    dispatch({ type: "LF_FETCH_SUCCESS", data:data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LF_FETCH_FAIL" });
  }
};

export const updateLostAndFound = (lfId, updatedData) => async (dispatch) => {
  try{
   const {data} = await LostFoundApi.updateLostAndFound(lfId, updatedData)
  } catch(error) {
    console.log(error)
  }
}