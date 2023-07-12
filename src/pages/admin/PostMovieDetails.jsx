import React, { useEffect, useState } from "react"
import { useQueryClient, useMutation } from "react-query"
import { addNewMovie } from "../../util/reactQuery"
import { getImageURL, getVideoURL } from "../../util/cloudinary"
import { Outlet, useNavigate } from "react-router-dom"

const PostMovieDetails = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const user = queryClient.getQueryData('user')
  useEffect(() => {
    if(!user?.isAdmin){
      navigate('/')
    }
  })

  const { mutate } = useMutation(addNewMovie, {
    onSuccess: (data) => {
      //console.log(data)
      console.log("Success")
      queryClient.invalidateQueries("movies")
    },
    onError: () => {
      console.log("Error")
    },
  })
  const [movieDetails, setmovieDetails] = useState({
    title: "",
    genre: "",
    description: "",
    thumbnail: "",
    imageURL: "",
    videoURL: "",
  })
  const handleChange = (e) => {
    setmovieDetails({
      ...movieDetails,
      [e.target.name]: e.target.value,
    })
  }
  const handleFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setmovieDetails({
        ...movieDetails,
        [e.target.name]: reader.result,
      })
    }
  }
  const submitData = async () => {
    try {
      const image = await getImageURL(movieDetails.imageURL)
      const thumb = await getImageURL(movieDetails.thumbnail)
      const video = await getVideoURL(movieDetails.videoURL)
      
      const obj = {
        title: movieDetails.title,
        genre: movieDetails.genre,
        description: movieDetails.description,
        thumbnail: thumb,
        imageURL: image,
        videoURL: video,
        token:user.token
      }
      console.log(obj);
      mutate(obj)
      setmovieDetails({
        title: "",
        genre: "",
        description: "",
        thumbnail: "",
        imageURL: "",
        videoURL: "",
      })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full lg:w-2/5 mx-auto">
      <p className="w-full text-white font-extrabold text-2xl text-center">
        Add New Movie to DataBase
      </p>
      
      <div className="mt-10">
        <div className="flex flex-col space-y-8">
          <div className="w-full lg:w-4/5 flex flex-col space-y-3 lg:flex-row justify-between items-center ">
            <label className="text-white">Movie Title:</label>
            <input
              type="text"
              className="w-2/3 text-sm p-2 border-2 focus:border-red-400 outline-none rounded-sm"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={movieDetails.title}
            />
          </div>
          <div className="w-full lg:w-4/5 flex flex-col space-y-3 lg:flex-row justify-between items-center ">
            <label className="text-white">Movie Genre:</label>
            <input
              type="text"
              className="w-2/3 text-sm p-2 border-2 focus:border-red-400 outline-none rounded-sm"
              placeholder="Genre"
              name="genre"
              onChange={handleChange}
              value={movieDetails.genre}
            />
          </div>
          <div className="w-full lg:w-4/5 flex flex-col space-y-3 lg:flex-row justify-between items-center ">
            <label className="text-white">Movie Description:</label>
            <textarea
              type="text"
              className="w-2/3 text-sm p-2 border-2 focus:border-red-400 outline-none rounded-sm h-fit"
              placeholder="Description"
              name="description"
              value={movieDetails.description}
              onChange={handleChange}
            />
          </div>
          <div className="w-full lg:w-4/5 flex flex-col space-y-3 lg:flex-row justify-between items-center ">
            <label className="text-white">Movie Poster:</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              name="thumbnail"
              onChange={handleFile}
              className="text-gray-300"
            />
          </div>
          <div className="w-full lg:w-4/5 flex flex-col space-y-3 lg:flex-row justify-between items-center ">
            <label className="text-white">Movie Image:</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              name="imageURL"
              onChange={handleFile}
              className="text-gray-300"
            />
          </div>
          <div className="w-full lg:w-4/5 flex flex-col space-y-3 lg:flex-row justify-between items-center ">
            <label className="text-white">Video File:</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFile}
              name="videoURL"
              className="text-gray-300"
            />
          </div>
          <div className="w-full flex justify-center">
            <button
              className=" text-center text-red-500 bg-white px-3 py-1 font-bold "
              onClick={submitData}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default PostMovieDetails
