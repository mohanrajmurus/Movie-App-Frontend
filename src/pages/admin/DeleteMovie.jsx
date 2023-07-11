import React from 'react'
import { MdDelete } from 'react-icons/md'
import { useMutation, useQueryClient } from 'react-query'
import {deleteMovie, getAllMovies} from '../../util/ReactQuery'
import { useNavigate } from 'react-router-dom'
const DeleteMovie = () => {
  const { isLoading, isError, error, data } = getAllMovies();
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const {mutate} = useMutation(deleteMovie,{
    onSuccess:()=>{
      queryClient.invalidateQueries('movies')
    }
  })
  return (
    <div className="w-11/12 mx-auto flex flex-wrap justify-center mt-10">
      {isLoading ? (
        <div className="border-4 border-gray-300 border-t-sky-400 rounded-full h-10 w-10 animate-spin text-center mt-10"></div>
      ) : isError ? (
        <span>{error.message}</span>
      ) : (
        data.map((item, i) => {
          
          const { title, imageURL, _id } = item;
          return (
            <div
              key={i}
              className="w-full md:w-1/4 lg:w-1/6 mr-5 mb-6 cursor-pointer hover:scale-105 transition-all ease-out duration-200 border-b-2 border-red-400 relative"
              onClick={() => navigate(`/movie/${_id}`)}
            >
              <img
                src={imageURL}
                alt={title}
                className="w-full h-72 object-cover"
              />
              <button className="text-white w-full text-center text-xl font-light italic p-2">
                {title}
              </button>
              <span className="absolute top-0 right-1 bg-white p-1" onClick={(e)=>{
                e.stopPropagation()
                mutate(_id)
              }}><MdDelete size={20}/></span>
            </div>
          );
        })
      )}
    </div>

  )
}

export default DeleteMovie