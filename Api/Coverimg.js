import { Coverimg } from "../axios/index";

export const AllCoverimg = async () => {
  var AllCoverimg = await Coverimg.get(`/viewall`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return AllCoverimg;
};

export const viewCoverimg = async (data) => {
  var viewCoverimg = await Coverimg.post(`/view`,data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return viewCoverimg;
};