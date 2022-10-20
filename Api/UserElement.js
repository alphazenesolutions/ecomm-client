import { Userelements } from "../axios/index";

export const SingleUserElement = async (data) => {
  var SingleUserElement = await Userelements.post(`/view`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return SingleUserElement;
};
