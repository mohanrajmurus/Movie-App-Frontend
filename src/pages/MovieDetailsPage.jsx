import {  useParams } from "react-router-dom"
import { getMovieById } from "../utils/reactQuery"
import { BigPlayButton, LoadingSpinner, Player } from "video-react"
import "../../node_modules/video-react/dist//video-react.css"
import { useState } from "react"
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
          <div className="w-full h-[70%]">
           {/*  <Player poster={data.thumbnail} src={data.videoURL} fluid={false} width={'100%'} height={'100%'}>
              <BigPlayButton position="center" />
              <LoadingSpinner />
            </Player> */}
            <span></span>
             <video src={data.videoURL} controls className="w-full h-full" poster={data.thumbnail}></video>
          </div>
          <div className="w-full flex flex-col items-start space-y-1">
            <span className="text-white text-3xl font-bold italic">{data.title}</span>
            <div className="w-full flex justify-center items-center">
              <span className={`text-gray-500 font-bold px-3 py-1 cursor-pointer ${switchTap ? 'bg-white text-black':''}`} onClick={()=>setSwitchTap(true)}>Reviews</span>
              <span className={`text-gray-500 font-bold px-3 py-1 cursor-pointer ${!switchTap ? 'bg-white text-black':''}`} onClick={() => setSwitchTap(false)}>Details</span>
            </div>
           {switchTap ? <div className="text-white">Reviews</div>:<div className="text-white">Details</div>}
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetailsPage
