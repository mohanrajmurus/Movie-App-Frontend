import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { getMovieById } from "../utils/reactQuery"
import { BigPlayButton, LoadingSpinner, Player } from "video-react"
import "../../node_modules/video-react/dist//video-react.css"
import { useState } from "react"
import MovieReview from "../components/MovieReview"
import MovieSummary from "../components/MovieSummary"
import {Tab,TabList,TabPanel, Tabs} from 'react-tabs'
import 'react-tabs/style/react-tabs.css';

const MovieDetailsPage = () => {
  const { id } = useParams()
  const { isLoading, isError, error, data } = getMovieById(id)
  const [switchTap, setSwitchTap] = useState(false)
  const navigate = useNavigate()
  const currLoc = useLocation()
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
            <div className="flex items-center space-x-5 mt-5">
              <span className="text-white text-3xl font-bold italic">
                {data.title}
              </span>
              <span className="text-white text-sm font-semibold py-1 px-3 bg-red-500 mt-2 cursor-pointer">
                + WatchList
              </span>
            </div>
            <div className="w-full">
              <Tabs className={'w-full'}>
                <TabList className={'text-white flex justify-center items-center space-x-3'} >
                    
                    <Tab className={'px-3 py-1 border-none cursor-pointer'} defaultFocus={false}>Details</Tab>
                    <Tab className={'px-3 py-1 border-none cursor-pointer'}>Review</Tab>
                </TabList>
                
                <TabPanel>
                  <MovieSummary/>
                </TabPanel>
                <TabPanel>
                  <MovieReview/>
                </TabPanel>
              </Tabs>
              {/* <NavLink
                to={`/movie/${id}/reviews`}
                className={({isActive}) => (isActive ? 'text-black bg-white font-bold px-3 py-1 cursor-pointer':'text-gray-500 font-bold px-3 py-1 cursor-pointer')}
              >
                Reviews
              </NavLink>
              <NavLink
                className={({isActive}) => (isActive ? 'text-black bg-white font-bold px-3 py-1 cursor-pointer':'text-gray-500 font-bold px-3 py-1 cursor-pointer')}
                to={`/movie/${id}/details`}
              >
                Details
              </NavLink> */}
            </div>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetailsPage
