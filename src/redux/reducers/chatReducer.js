import produce from 'immer';
import createReducer from './reducerUtills';

const initialState = {
    user: [
        // {
        //     email: 'trial',
        //     conversation: 1
        // }
    ],
    messages: [],
    lastMessage: ''
}
const chat = {
    setUser(state = initialState, action) {
        state.user.push(action.payload);
    },
    setConversation(state, action) {
        state.user.conversation = action.payload;
    },
    setMessages(state, action) {
        state.user.messages = action.payload.messages;
    },
    setLastMessage(state, action) {
        state.lastMessage = action.payload;
    }
}
export default produce((state, action) => createReducer(state, action, chat), initialState);