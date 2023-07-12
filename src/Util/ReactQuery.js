import axios from "axios"
import { useQuery } from "react-query"
const url = API__URL

export const getAllMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/allmovies`)
      return data
    },
  })
}

export const getMovieById = (id) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/movie/${id}`)
      return data
    },
  })
}
export const createAccount = async(user) => {
  const {data} = await axios.post(`${url}/user`,user)
  return data
}
export const deleteMovie = async (id) => {
  const { data } = await axios.delete(`${url}/movie/${id}`)
  return data
}
export const addNewMovie = async (movie) => {
  const { data } = await axios.post(`${url}/addmovie`, movie)
  return data
}
