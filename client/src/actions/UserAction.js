import * as UserApi from "../api/UserRequests";


export const updateUser=(id, formData)=> async(dispatch)=> {
    dispatch({type: "UPDATING_START"})
    try{
        const {data} = await UserApi.updateUser(id, formData);
        console.log("Action ko receive hoa hy ye : ",data)
        dispatch({type: "UPDATING_SUCCESS", data: data})
    }   
    catch(error){
        dispatch({type: "UPDATING_FAIL"})
    }
}


export const followUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "FOLLOW_USER", data: id})
    UserApi.followUser(id, data)
}

export const unfollowUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "UNFOLLOW_USER", data: id})
    UserApi.unfollowUser(id, data)
}

//my code
export const getProfileUser = (id) => async(dispatch)=> {
    console.log("user id from use action is",id)
   const {data} = await UserApi.getUser(id)
   dispatch({type: "PROFILE_USER",data})
}

export const getAllUsers = () => async(dispatch)=> {
    dispatch({type: "USERS_FETCH_START"});
    try{
       const {data} = await UserApi.getAllUser();
       dispatch({type: "USERS_FETCH_SUCCESS", data: data})
    } catch(error) {
        dispatch({type: "USERS_FETCH_FAIL"})
    }
    

}

