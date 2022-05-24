function convertActionTypeToName(actionType) {//capital
    return actionType.toLowerCase().replace(/_(\w)/g, v => v[1].toUpperCase());//camelCase
}

export default function createReducer(state, action, handlers) {
    const key = convertActionTypeToName(action.type);
    const handler = handlers[key];
    if (handler) {
        handler(state, action);
    }
}