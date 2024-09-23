import { SET_USER } from "../actions/actionType";

const INITIAL_STATE = {
    userState: {
        user: null,
    },
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                userState: {
                    ...state.userState,
                    user: action.user,
                },
            };
        default:
            return state;
    }
};

export default userReducer;
