import React from "react";
import classes from "./Emptydata.module.css";
const Emptydata = (props) => {
  return (
    <div className={classes.EmptyData}>
      <img src="./notavailable.jpeg" />
      <h1>
        <span className={classes.Sorry}>Sorry...!</span>
        <br /> No
        <span className={classes.Wishlist}> {props.data} </span>
        available for you.
      </h1>
    </div>
  );
};

export default Emptydata;
