import * as ChatApi from "../api/ChatRequests";

export const getAllChatPairs = () => async (dispatch) => {
    const {data} = await ChatApi.getAllChats();
    dispatch({type: "ALL_CHAT_PAIRS",data: data})
}
export const createChatPair =  (chatStart) =>async (dispatch)=> {
    await ChatApi.createChat(chatStart);
    dispatch(getAllChatPairs());
}
