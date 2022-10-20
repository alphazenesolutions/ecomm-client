import "../styles/globals.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Store from "../Store/Store";
import { Allstore } from "../Api/Store";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    getalldata();
  }, []);

  const getalldata = async () => {
    var str = window.location.href;
    var part = str.split("//").pop().split("/")[0];
    var allstore = await Allstore();
    var checkdomain = await allstore.data.filter((data) => {
      return data.domain === part;
    });
    sessionStorage.setItem("store_id", checkdomain[0].id);
    sessionStorage.setItem("user_id", checkdomain[0].user_id);
  };
  return (
    <Provider store={Store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
