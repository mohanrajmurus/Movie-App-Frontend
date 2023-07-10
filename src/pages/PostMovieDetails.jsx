import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { addNewMovie } from "../Util/ReactQuery";
import { getImageURL, getThumbnailURL, getVideoURL } from "../Util/cloudinary";
import {useNavigate} from 'react-router-dom'


const PostMovieDetails = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const { mutate } = useMutation(addNewMovie, {
    onSuccess: (data) => {
      console.log(data);
      console.log("Success");
      queryClient.invalidateQueries("movies");
    },
    onError: () => {
      console.log("Error");
    },
  });
  const [movieDetails, setmovieDetails] = useState({
    title: "",
    genre: "",
    description: "",
    thumbnail: "",
    imageURL: "",
    videoURL: "",
  });
  const handleChange = (e) => {
    setmovieDetails({
      ...movieDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleFile = (e) => {
    setmovieDetails({
      ...movieDetails,
      [e.target.name]: e.target.files[0],
    });
  };

  const submitData = async () => {
    try {
      const image = await getImageURL(movieDetails.imageURL);
      const video = await getVideoURL(movieDetails.videoURL);
      const thumb = await getThumbnailURL(movieDetails.thumbnail);

      const movie = {
        title: movieDetails.title,
        genre: movieDetails.genre,
        description: movieDetails.description,
        thumbnail: thumb,
        imageURL: image,
        videoURL: video,
      };
      console.log(movie);
      mutate(movie);
      setmovieDetails({
        title: "",
        genre: "",
        description: "",
        thumbnail: "",
        imageURL: "",
        videoURL: "",
      });
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-2/5 mx-auto">
      <p className="w-full text-white font-extrabold text-2xl text-center">
        Add New Movie to DataBase
      </p>
      <div className="mt-10">
        <div className="flex flex-col space-y-8">
          <div className="w-4/5 flex justify-between items-center ">
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
          <div className="w-4/5 flex justify-between items-center ">
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
          <div className="w-4/5 flex justify-between items-center ">
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
          <div className="w-4/5 flex justify-between items-center ">
            <label className="text-white">Movie Poster:</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              name="thumbnail"
              onChange={handleFile}
              className="text-gray-300"
            />
          </div>
          <div className="w-4/5 flex justify-between items-center ">
            <label className="text-white">Movie Image:</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              name="imageURL"
              onChange={handleFile}
              className="text-gray-300"
            />
          </div>
          <div className="w-4/5 flex justify-between items-center ">
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
    </div>
  );
};

export default PostMovieDetails;
