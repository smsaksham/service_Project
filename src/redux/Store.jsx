import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice.jsx"

const store = configureStore({
    reducer:{
        userData : userSlice
    }
})
export default store;