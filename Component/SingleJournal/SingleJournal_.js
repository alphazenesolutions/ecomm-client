import React, { useEffect, useState } from "react";
import classes from "./SIngleJournal.module.css";
import { viewJournal } from "../../Api/Journal";

const SingleJournal_ = () => {
  useEffect(() => {
    getSingleProduct();
  }, []);
  const [single_journal, setsingle_journal] = useState([]);
  const getSingleProduct = async () => {
    var str = window.location.href;
    var part = str.split("//").pop().split("/").pop().split("/")[0];
    var singlejournal = await viewJournal({ id: part });
    if (singlejournal.length !== 0) {
      setsingle_journal(singlejournal);
    }
  };
  return (
    <div className="p-4">
      {single_journal.length !== 0 ? (
        <div className={classes.SingleJournal_Pagelayout}>
          <h1 className="my-4 text-2xl font-bold">
            {single_journal[0].heading}
          </h1>
          <img src= {single_journal[0].image} />
          <div>
            <h1 className="tracking-wider font-thin text-sm my-8">
              {single_journal[0].subheading}
            </h1>
            <p className="text-justify leading-8">
              {single_journal[0].description}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SingleJournal_;
