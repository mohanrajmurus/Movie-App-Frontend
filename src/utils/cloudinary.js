import axios from "axios"
const url = API__URL

export const getImageURL = async (file,title) => {
  try {
    const { data } = await axios.post(`${url}/imgurl`, { file ,title})

    return data.url
  } catch (error) {
    throw new Error(error)
  }
}
export const getVideoURL = async (file,title) => {
  try {
    const { data } = await axios.post(`${url}/videourl`, { file ,title})
    return data.url
  } catch (error) {
    throw new Error(error)
  }
}
