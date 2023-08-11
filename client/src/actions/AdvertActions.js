import * as advertApi from "../api/AdvertRequests";

export const getAllAdverts = () => async (dispatch) => {
  dispatch({ type: "ADVERT_FETCH_START" });
  try {
    const { data } = await advertApi.getAllAdverts();
    console.log("all fetched adverts are",data);
    dispatch({ type: "ADVERT_FETCH_SUCCESS", data:data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADVERT_FETCH_FAIL" });
  }
};
