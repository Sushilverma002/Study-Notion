import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initalState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("toalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "card",
  initialState: initalState,
  reducers: {
    //add to cart
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index > 0) {
        // If the course is already in the cart, do not modify the quantity
        toast.error("Course already in Cart");
        return;
      }

      //If the course if not in the cart, add it to the cart
      state.cart.push(course);
      //update the total quantity and price
      state.totalItems++;
      state.total += course.price;

      //update to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("toalItems", JSON.stringify(state.toalItems));
      //Show toast
      toast.success("Courses added to cart");
    },
  },
  // remove form cart
  removeFromCart: (state, action) => {
    const courseId = action.payload;
    const index = state.cart.findIndex((item) => item._id === courseId);

    if (index > 0) {
      //if the course is found in the cart,remove it
      state.totalItems--;
      state.total -= state.cart[index].price;
      state.cart.splice(index, 1);

      //update to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      //show toast
      toast.success("Course removed from cart");
    }
  },
  //reset your cart
  resetCart: (state) => {
    state.cart = [];
    state.total = 0;
    state.toalItems = 0;

    //update to localStorage
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
    localStorage.removeItem("totalItems");
  },
});

export const { resetCart, removeFromCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
