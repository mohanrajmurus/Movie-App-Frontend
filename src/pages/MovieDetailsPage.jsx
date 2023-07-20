import { useParams } from "react-router-dom"
import { getMovieById } from "../utils/reactQuery"
import { BigPlayButton, LoadingSpinner, Player } from "video-react"
import "../../node_modules/video-react/dist//video-react.css"
import { useState } from "react"
import MovieReview from '../components/MovieReview'
const MovieDetailsPage = () => {
  const { id } = useParams()
  const { isLoading, isError, error, data } = getMovieById(id)
  const [switchTap, setSwitchTap] = useState(false)

  return (
    <div className="w-11/12 mx-auto mt-10 flex justify-center">
      {isLoading ? (
        <div className="border-4 border-gray-300 border-t-sky-400 rounded-full h-10 w-10 animate-spin text-center mt-10"></div>
      ) : isError ? (
        <div>
          <span className="text-red-500 ">{error.response.data}</span>
        </div>
      ) : (
        <div key={data.id} className=" w-full h-screen">
          <div className="w-full h-[30%] lg:h-[70%]">
            {/*  <Player poster={data.thumbnail} src={data.videoURL} fluid={false} width={'100%'} height={'100%'}>
              <BigPlayButton position="center" />
              <LoadingSpinner />
            </Player> */}
            <span></span>
            <video
              src={data.videoURL}
              controls
              className="w-full h-full"
              poster={data.thumbnail}
            ></video>
          </div>
          <div className="w-full flex flex-col items-start space-y-1">
            <span className="text-white text-3xl font-bold italic">
              {data.title}
            </span>
            <div className="w-full flex justify-center items-center">
              <span
                className={`text-gray-500 font-bold px-3 py-1 cursor-pointer ${
                  switchTap ? "bg-white text-black" : ""
                }`}
                onClick={() => setSwitchTap(true)}
              >
                Reviews
              </span>
              <span
                className={`text-gray-500 font-bold px-3 py-1 cursor-pointer ${
                  !switchTap ? "bg-white text-black" : ""
                }`}
                onClick={() => setSwitchTap(false)}
              >
                Details
              </span>
            </div>
            {switchTap ? (
              <div className="text-white w-full">
                <MovieReview movie={data}/>
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
                  <h1 className="text-white underline text-sm">
                    Music Director
                  </h1>
                  <p className="text-gray-400">{data.castandcrews.music_dir}</p>
                </div>
                <div>
                  <h1 className="text-white underline text-sm">Starring</h1>
                  <p className="text-gray-400">
                    {data.castandcrews.cast.join(', ')} and more..
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetailsPage
