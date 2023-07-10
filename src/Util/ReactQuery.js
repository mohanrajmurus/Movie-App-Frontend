import axios from 'axios';
import {useQuery} from 'react-query';

export const getAllMovies = () => {
    return useQuery({
        queryKey:['movies'],
        queryFn: async () => {
            const {data} = await axios.get('http://localhost:4001/allmovies')
            return data
        }
    })
}

export const getMovieById = (id) => {
    return useQuery({
        queryKey:['movie',id],
        queryFn: async () => {
            const {data} = await axios.get(`http://localhost:4001/movie/${id}`)
            return data
        }
    })
}

export const addNewMovie = async(movie) => {
    const {data} = await axios.post('http://localhost:4001/addmovie',movie)
    return data
}