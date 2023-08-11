const chatReducer = (state = { chatUsers: [], loading: false, error: false, allChatPairs: null}, action) => {
    switch (action.type) {
            case "SAVE_USER":
                return ({...state, chatUsers: [...state.chatUsers, action.data]});
            case "ALL_CHAT_PAIRS":
                return ({...state, allChatPairs: action.data});
             default:
                return state
    }} 
export default chatReducer