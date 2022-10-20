import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { Allstore } from "../Api/Store";

// var store_id = process.env.STORE_ID;
// var user_id = process.env.USER_ID;
// var data = [];

// const getalldata = async () => {
//   var str = window.location.href;
//   var part = str.split("//").pop().split("/")[0];
//   var allstore = await Allstore();
//   var checkdomain = await allstore.data.filter((data) => {
//     return data.domain === part;
//   });
//   data.push(checkdomain);
// };
// getalldata();
// console.log(data);

const StoreSlice = createSlice({
  name: "Store",
  initialState: {
    storeid: 1,
    user_id: 1,
  },
  reducers: {
    storeidHandler(state, payload) {
      state.storeid = payload.payload.store_id;
    },
    useridHandler(state, payload) {
      state.user_id = payload.payload.userId;
    },
  },
});

export const storeAction = StoreSlice.actions;
const Store = configureStore(StoreSlice);
export default Store;
