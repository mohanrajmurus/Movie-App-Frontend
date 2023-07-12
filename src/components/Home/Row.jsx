import React from "react"
import { useNavigate } from "react-router-dom"
import { getAllMovies } from "../../util/reactQuery"

const Row = () => {
  const navigate = useNavigate()
  const { isLoading, isError, error, data } = getAllMovies()

  return (
    <div className="w-11/12 mx-auto flex flex-wrap justify-start mt-10">
      {isLoading ? (
        <div className="border-4 border-gray-300 border-t-sky-400 rounded-full h-10 w-10 animate-spin text-center mt-10"></div>
      ) : isError ? (
        <span>{error.message}</span>
      ) : (
        data.map((item, i) => {
          const { title, imageURL, _id } = item
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
            </div>
          )
        })
      )}
    </div>
  )
}

export default Row
