import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/userReducer'; // Ensure this is your combined reducer

const store = configureStore({
    reducer: rootReducer,
});

export default store;
