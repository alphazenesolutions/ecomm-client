import { Variation } from "../axios/index";

export const CreateVariation = async (data) => {
  var createVariation = await Variation.post(`/create`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return createVariation;
};
export const productVariation = async (data) => {
  var productVariation = await Variation.post(`/view`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return productVariation;
};

export const viewVariation = async (data) => {
  var viewVariation = await Variation.post(`/viewVariation`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return viewVariation;
};

