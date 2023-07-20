import React, { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { getAllMovies } from "../../utils/reactQuery"
import { useNavigate } from "react-router-dom"
const SearchWrapper = () => {
  const [searchKey, setSearchKey] = useState("")
  const [movies, setMovies] = useState([])
  const { data } = getAllMovies()
  const navigate = useNavigate()
  const fetchMovies = (value) => {
    const result =
      value && data?.filter((i) => i.title.toLowerCase().includes(value))
    setMovies(result)
  }
  const handleChange = (e) => {
    setSearchKey(e.target.value)
    fetchMovies(e.target.value)
  }
  return (
    <div className="w-2/4 lg:w-1/3 h-full relative">
      <div className="w-full flex items-center space-x-4 h-full">
        <input
          type="text"
          placeholder="search movies...."
          className="w-full bg-inherit px-3 py-1 border-none outline-none text-white"
          value={searchKey}
          onChange={handleChange}
        />
        <CiSearch fill="#fff" size={25} className="cursor-pointer" />
      </div>
      {movies.length > 0 && (
        <div className="w-full bg-gray-950 text-white absolute top-16 z-10  h-fit">
          {movies.map((movie, i) => {
            return (
              <div
                key={i}
                className="w-full hover:bg-gray-800 cursor-pointer"
                onClick={() => {
                  navigate(`/movie/${movie._id}`)
                  setSearchKey("")
                  setMovies([])
                }}
              >
                <span className="text-sm py-3 px-3 w-full ">
                  {movie.title.toLowerCase()}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchWrapper
