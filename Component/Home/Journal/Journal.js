import React, { useEffect, useState } from "react";
import classes from "./Journal.module.css";
import { AllJournal } from "../../../Api/Journal";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
const Journal = () => {
  const [journaldata, setjournaldata] = useState([]);
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const store = sessionStorage.getItem("store_id");

    var alljournal = await AllJournal();
    var checkjournal = await alljournal.filter((data) => {
      return data.store == store;
    });
    setjournaldata(checkjournal.slice(0, 4));
  };
  const getsinglejournal = async (e) => {
    window.location.replace(`/Journal/${e.target.id}`);
  };
  return (
    <div className="p-8 mt-4 ">
      <h1 className="text-center text-2xl ">The New Journal</h1>
      <div className={`${classes.Journal_images} mt-8 grid grid-cols-4 gap-4`}>
        {journaldata.length !== 0
          ? journaldata.map((data, index) => (
              <div
                className="flex flex-col items-center"
                key={index}
                id={data.id}
                onClick={getsinglejournal}
              >
                <div
                  className="grid grid-cols-2 items-center gap-4 bg-yellow-100"
                  id={data.id}
                >
                  <img src={data.image} id={data.id} />
                  <h1 id={data.id}>{data.heading}</h1>
                </div>
                <p className="text-center my-4" id={data.id}>
                  {data.subheading}
                </p>
              </div>
            ))
          : null}
      </div>
      {journaldata.length !==0 ?null:<center><div><h1 style={{textAligh:"center"}}>No Journal Available</h1></div></center>}
      
    </div>
  );
};

export default Journal;
