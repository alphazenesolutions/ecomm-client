import React from "react";
import classes from "./Loader.module.css";
import LoadingButton from "@mui/lab/LoadingButton";

const Loader = () => {
  return (
    <div>
      <LoadingButton loading>Submit</LoadingButton>
      {/* <div className={classes.loadingio_spinner_spinner_cz5wrjj0je9}>
        <div className={classes.ldio_jpo2k2p6cv}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div> */}
    </div>
  );
};

export default Loader;
