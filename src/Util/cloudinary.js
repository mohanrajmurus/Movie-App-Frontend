import axios from "axios";
const url = API__URL;

export const getImageURL = async (file) => {

  try {
    const {data} = await axios.post(`${url}/imgurl`, {file});
   
    return data.url;
  } catch (error) {
    throw new Error(error);
  }
};
export const getVideoURL = async (file) => {

  try {
    const {data} = await axios.post(`${url}/videourl`, {file});
    return data.url;
  } catch (error) {
    throw new Error(error);
  }
};
