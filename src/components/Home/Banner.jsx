import React, { useState } from "react"
import { GrNext, GrPrevious } from "react-icons/gr"
import { getAllMovies } from "../../utils/reactQuery"
import { useNavigate } from "react-router-dom"
const Banner = () => {
  const navigate = useNavigate()
  const { isLoading, isError, error, data } = getAllMovies()
  const [slideIndex, setSlideIndex] = useState(1)

  const nextSlide = () => {
    if (slideIndex === data.length) setSlideIndex(1)
    else setSlideIndex(slideIndex + 1)
  }
  const prevSlide = () => {
    if (slideIndex === 1) {
      setSlideIndex(data.length)
    } else setSlideIndex(slideIndex - 1)
  }
  return (
    <div className="w-11/12 mx-auto flex flex-col items-center space-y-5">
      {isLoading ? (
        <div className="border-4 border-gray-300 border-t-sky-400 rounded-full h-10 w-10 animate-spin text-center mt-10"></div>
      ) : isError ? (
        <span>{error.message}</span>
      ) : (
        <div className="w-full relative cursor-pointer">
          {data.map((item, i) => {
            return (
              <div key={i}>
                <img
                  src={item.thumbnail}
                  alt="avenger poster"
                  className={`${
                    slideIndex === i + 1
                      ? "w-full h-64 lg:h-96 object-fill"
                      : "hidden"
                  }`}
                  onClick={() => navigate(`/movie/${item._id}`)}
                />
              </div>
            )
          })}
          <span
            onClick={prevSlide}
            className="absolute top-[50%] right-5 translate-y-[50% bg-gray-100 opacity-30"
          >
            <GrNext size={20} fill="white" />
          </span>
          <span
            onClick={nextSlide}
            className="absolute z-20 top-[50%] left-5 translate-y-[50%] bg-gray-100 opacity-30"
          >
            <GrPrevious size={20} fill="white" />
          </span>
        </div>
      )}
    </div>
  )
}

export default Banner
