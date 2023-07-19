/* eslint-disable react/jsx-key */
import React, { useState } from "react"
import { AiFillStar } from "react-icons/ai"
const MovieReview = () => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [postrate, setPostrate] = useState(false)
  return (
    <div className="w-full">
      <div className="w-1/2 flex justify-start items-center space-x-28">
        <div className="flex items-center space-x-2">
          <div>
            <AiFillStar size={30} fill="#f8ea06" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm text-gray-300">4.5/5</span>
            <span className="text-sm text-gray-300">10K</span>
          </div>
        </div>
        <div className=" w-full flex space-x-3">
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
            <span className="text-white text-sm">Your Rating: {rating}</span>
            <button
              className="bg-red-500 text-white px-3 py-1"
              onClick={() => setPostrate(!postrate)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 mt-5">
        <div className="flex justify-start space-x-64">
          <span className="text-2xl font-bold">Reviews</span>
          <button className="bg-red-500 text-white px-3 py-1">
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
