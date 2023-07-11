import React from "react"
import { useParams } from "react-router-dom"
import { getMovieById } from "../Util/ReactQuery"
import { BigPlayButton, LoadingSpinner, Player } from "video-react"
import "../../node_modules/video-react/dist//video-react.css"
const MovieDetailsPage = () => {
  const { id } = useParams()
  const { isLoading, isError, error, data } = getMovieById(id)

  return (
    <div className="w-11/12 mx-auto mt-10">
      {isLoading ? (
        <div className="border-4 border-gray-300 border-t-sky-400 rounded-full h-10 w-10 animate-spin text-center mt-10"></div>
      ) : isError ? (
        <span>{error.message}</span>
      ) : (
        <div key={data.id} className=" w-full">
          <div className="w-2/3 ">
            <Player poster={data.thumbnail} src={data.videoURL}>
              <BigPlayButton position="center" />
              <LoadingSpinner />
            </Player>
            <span></span>
            {/*  <video src={data.videoURL} controls className="w-full h-full"></video> */}
          </div>
          <div className="w-full flex flex-col items-start space-y-1">
            <span className="text-white text-2xl font-extrabold">
              {data.title}
            </span>
            <span className="text-xs text-white bg-red-500 px-1 py-1 rounded-xl border-2 border-white">
              {data.genre}
            </span>
            <span className="text-gray-200 font-extralight text-justify">
              {data.description}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetailsPage
