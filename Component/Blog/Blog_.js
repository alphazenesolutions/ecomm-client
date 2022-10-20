import React, { useEffect, useState } from "react";
import classes from "./Blog.module.css";
import { AllJournal } from "../../Api/Journal";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
const Blog_ = () => {
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
    setjournaldata(checkjournal);
  };
  const getsinglejournal = async (e) => {
    window.location.replace(`/Journal/${e.target.id}`);
  };
  return (
    <div className="flex flex-col items-center p-4 my-8 ">
      <h1 className="text-2xl mb-4 ">All Blogs</h1>
      <div className={`${classes.Blogs}  grid grid-cols-4 gap-4`}>
        {journaldata.length !== 0
          ? journaldata.map((data, index) => (
              <div
                className="flex flex-col items-center p-4"
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
    </div>
  );
};

export default Blog_;
