import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Ensure this is the correct path to your user reducer
import articleReducer from './articleReducer'; // Ensure this is the correct path to your article reducer

const rootReducer = combineReducers({
    user: userReducer,
    articles: articleReducer, // Add articleReducer to the root reducer
});

export default rootReducer;
