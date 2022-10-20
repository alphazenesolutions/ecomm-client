import { Journal } from "../axios/index";

export const AllJournal = async () => {
  var AllJournal = await Journal.get(`/viewall`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return AllJournal;
};

export const viewJournal = async (data) => {
  var viewJournal = await Journal.post(`/view`,data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return viewJournal;
};