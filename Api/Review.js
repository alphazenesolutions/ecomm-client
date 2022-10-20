import { Review } from "../axios/index";

export const CreateReview = async (data) => {
  var createReview = await Review.post(`/create`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return createReview;
};


export const AllReview = async () => {
  var AllReview = await Review.get(`/myreview`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return AllReview;
};