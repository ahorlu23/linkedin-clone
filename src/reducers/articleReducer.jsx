import { SET_ARTICLES, SET_LOADING_STATUS } from '../actions/actionType';

const initialState = {
    articles: [],
    loading: false,
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ARTICLES:
            return {
                ...state,
                articles: action.articles,
            };
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status,
            };
        default:
            return state;
    }
};

export default articleReducer;
