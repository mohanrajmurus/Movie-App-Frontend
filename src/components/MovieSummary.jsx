/* eslint-disable react/prop-types */
import React from "react"
import { useParams } from "react-router-dom"
import { getMovieById } from "../utils/reactQuery"

const MovieSummary = () => {
  const { id } = useParams()

  const { isLoading, isError, error, data } = getMovieById(id)

  return (
    <>
      {isLoading ? (
        <div className="border-4 border-gray-300 border-t-sky-400 rounded-full h-10 w-10 animate-spin text-center mt-10"></div>
      ) : isError ? (
        <div>
          <span className="text-red-500 ">{error.response.data}</span>
        </div>
      ) : (
        <div className="flex flex-col items-start space-y-4">
          <div>
            <h1 className="text-white underline text-sm">Story Line</h1>
            <p className="text-gray-400">{data.description}</p>
          </div>
          <div>
            <h1 className="text-white underline text-sm">Genre</h1>
            <p className="text-gray-400">{data.genre}</p>
          </div>
          <div>
            <h1 className="text-white underline text-sm">Director</h1>
            <p className="text-gray-400">{data.castandcrews.director}</p>
          </div>
          <div>
            <h1 className="text-white underline text-sm">Producer</h1>
            <p className="text-gray-400">{data.castandcrews.producer}</p>
          </div>
          <div>
            <h1 className="text-white underline text-sm">Music Director</h1>
            <p className="text-gray-400">{data.castandcrews.music_dir}</p>
          </div>
          <div>
            <h1 className="text-white underline text-sm">Starring</h1>
            <p className="text-gray-400">
              {data.castandcrews.cast.join(", ")} and more..
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default MovieSummary
