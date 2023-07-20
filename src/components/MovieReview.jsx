/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { AiFillStar } from "react-icons/ai"
import { addmovieRating } from "../utils/reactQuery"
import { useMutation, useQueryClient } from "react-query"
const MovieReview = ({ movie }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [postrate, setPostrate] = useState(false)
  const [model, setModel] = useState(false)
  const queryClient = useQueryClient();
  const user = JSON.parse(sessionStorage.getItem('user'))
  
  const isRated = movie.ratings?.some(item => item.user === user.id)
  
  const { mutate } = useMutation(addmovieRating, {
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey:['movie',movie._id]
      })
    },
  })
  const submitRating = () => {
    setPostrate(!postrate)
    mutate({ id: movie?._id, userrating: rating })
    setRating(0)
  }
  const avgRate = movie.ratings.reduce((acc,curr) => curr.userrating + acc,0)
  return (
    <div className="w-full">
      <div className="w-1/2 flex justify-start items-center space-x-28">
        <div className="flex items-center space-x-2">
          <div>
            <AiFillStar size={30} fill="#f8ea06" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-lg text-gray-300 font-bold">{(avgRate / movie.ratings.length).toFixed(2)}</span>
            <span className="text-sm text-gray-300 italic font-extralight">{movie.ratings.length} count</span>
          </div>
        </div>
        {!isRated &&         <div className=" w-full flex space-x-3">
          <div className="mt-4">
            {[...Array(5)].map((item, i) => {
              return (
                <button
                  className={`${
                    i + 1 <= (rating || hover) ? "text-amber-300" : "text-white"
                  } bg-transparent border-none outline-none cursor-pointer text-3xl`}
                  type="button"
                  key={i}
                  onClick={() => setRating(i + 1)}
                  onMouseEnter={() => setHover(i + 1)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span className="star">&#9733;</span>
                </button>
              )
            })}
          </div>

          <div className="flex  items-center space-x-4 mt-4">
            <span className="text-white text-sm">Your Rating: {movie.ratings.userrating}</span>
            <button
              className="bg-red-500 text-white px-3 py-1"
              onClick={submitRating}
            >
              Post
            </button>
          </div>
        </div>}
      </div>
      {model && (
        <div className="w-full">
          <form></form>
        </div>
      )}
      <div className="w-1/2 mt-5">
        <div className="flex justify-start space-x-64">
          <span className="text-2xl font-bold">Reviews</span>
          <button
            className="bg-red-500 text-white px-3 py-1"
            onClick={() => setModel(!model)}
          >
            Add Review
          </button>
        </div>
        <div className="flex justify-start space-x-4">
          <div>image</div>
          <div className="flex flex-col items-start space-y-3">
            <span>username</span>
            <span>title</span>
            <span>text</span>
            <span>date</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieReview
