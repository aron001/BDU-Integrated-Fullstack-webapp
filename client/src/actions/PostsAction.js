import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {    
    const postAndUserData = (userData, postuserid, da) => {
     
         if(userData._id === postuserid) {
     da.postOwnerData.push(userData);
    // appendObjTo(data,{"userData":userData})
    //console.log("userdataid",userData._id)
    //console.log("postuserid",postuserid)
    //console.log("the data type is",typeof(da.postOwnerData))


    
      dispatch({ type: "RETREIVING_SUCCESS", data: data });
      }
      
     
    };
    const getPostUser = async (postuserid, da) => {
      const { data } = await PostsApi.getPostUser(postuserid);
      let userData = data;
     // console.log("yesssssssssssss",userData)
      postAndUserData(userData, postuserid, da);
    };
    const { data } = await PostsApi.getTimelinePosts(id);
    data.map((da) => {
      const postuserid = da.userId;
      getPostUser(postuserid, da);
    });
    
    

  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

