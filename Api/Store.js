import { Store } from "../axios/index";

export const CreateStore = async (data) => {
  var createstore = await Store.post(`/create`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return createstore;
};


export const Allstore = async () => {
  var Allstore = await Store.get(`/viewall`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return Allstore;
};

export const SingleStore = async (data) => {
  var SingleStore = await Store.post(`/viewbyuser`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return SingleStore;
};