import { Theme } from "../axios/index";

export const AllTheme = async () => {
  var AllTheme = await Theme.get(`/viewall`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return AllTheme;
};
