import { configureStore } from "@reduxjs/toolkit";
import shopSlice from "./shop";

const store = configureStore({
    reducer: {
        shop: shopSlice.reducer,
    }
})

export default store