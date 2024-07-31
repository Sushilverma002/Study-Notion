import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

const initalState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "card",
  initialState: initalState,
  reducers: {
    setTotalItem(state, value) {
      state.cart = value.payload;
    },
    //add to cart
    // remove to cart
    //reset cart
  },
});

export const { setTotalItem } = cartSlice.actions;
export default cartSlice.reducer;
