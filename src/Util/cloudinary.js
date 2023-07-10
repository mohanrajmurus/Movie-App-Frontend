import axios from "axios";

const generateFormData = (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "movieAapp");
  data.append("cloud_name", "mohanraj0804");
  return data;
};

export const getImageURL = async (file) => {
  try {
    const fileData = generateFormData(file);
    const {
      data: { url },
    } = await axios.post(
      "https://api.cloudinary.com/v1_1/mohanraj0804/image/upload",
      fileData
    );
    return url;
  } catch (error) {
    throw new Error(error);
  }
};

export const getThumbnailURL = async (file) => {
  try {
    const fileData = generateFormData(file);
    const {
      data: { url },
    } = await axios.post(
      "https://api.cloudinary.com/v1_1/mohanraj0804/image/upload",
      fileData
    );
    return url;
  } catch (error) {
    throw new Error(error);
  }
};
export const getVideoURL = async (file) => {
  try {
    const fileData = generateFormData(file);
    const {
      data: { url },
    } = await axios.post(
      "https://api.cloudinary.com/v1_1/mohanraj0804/video/upload",
      fileData
    );
    return url;
  } catch (error) {
    throw new Error(error);
  }
};
