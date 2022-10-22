import React, { useEffect, useState } from "react";
import { Allstore, MyStore } from "../Api/Store";
import { AllTheme } from "../Api/Theme";
import { Theme } from "../axios";
import Theme1 from "./Theme1";
import Theme2 from "./Theme2";

export default function Home() {
  const [theme, settheme] = useState([]);
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const store = sessionStorage.getItem("store_id");

    var Mystore = await Allstore();
    var my_store = Mystore.data.filter((data) => {
      return data.id == store;
    });
    var allTheme = await AllTheme();
    var checkTheme = await allTheme.filter((data) => {
      return data.name == my_store[0].theme;
    });
    console.log(checkTheme[0].name);
    settheme(checkTheme[0].name);
  };
  return (
    <div>
      {theme == "theme1" && <Theme1 />}
      {theme == "theme2" && <Theme2 />}
    </div>
  );
}
