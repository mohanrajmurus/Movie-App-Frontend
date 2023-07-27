/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { AiFillStar } from "react-icons/ai"
import {
  addmovieRating,
  addReviews,
  getMovieRating,
  getMovieReviews,
} from "../utils/reactQuery"
import { useMutation, useQueryClient } from "react-query"
import { RxAvatar } from "react-icons/rx"
import axios from "../utils/axios"
import { useParams } from "react-router-dom"
import { Button, Form, Input, Modal } from "antd"
import TextArea from "antd/es/input/TextArea"
const MovieReview = () => {
  const { id } = useParams()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [postrate, setPostrate] = useState(false)
  const [model, setModel] = useState(false)
  const queryClient = useQueryClient()
  const user = JSON.parse(sessionStorage.getItem("user"))
  const [users, setUsers] = useState([])
  const { isLoading, isError, error, data } = getMovieRating(id)
  const reviews = getMovieReviews(id)
  const[form] = Form.useForm()
  useEffect(() => {
    const getAllUser = async () => {
      const { data } = await axios.get("/user")
      setUsers(data)
    }
    getAllUser()
  }, [])
  const isRated = data?.some((item) => item.user === user.id)

  const { mutate } = useMutation(addmovieRating, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ratings", id],
      })
    },
  })
  const mutation = useMutation(addReviews, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", id],

      })
    },
    onError:(err) => {
      console.log(err);
    }
  }) 
  const submitRating = (r) => {
    setRating(r)
    setPostrate(!postrate)
    mutate({ id, ratings: r })
    setRating(0)
  }
  //const avgRate = movie.ratings.reduce((acc, curr) => curr.userrating + acc, 0)
  if (isLoading || reviews.isLoading) {
    return (
      <div className="border-4 border-gray-300 border-t-red-400 rounded-full h-10 w-10 animate-spin text-center mt-10"></div>
    )
  }
const submitReview = (values) => {
  const comments = {
title:values.title,
body:values.review
}
mutation.mutate({id,comments})
form.resetFields()
setModel(!model)
}
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="w-1/2 flex justify-start items-center space-x-28">
          {data.length > 0 && (
            <div className="flex items-center space-x-2">
              <div>
                <AiFillStar size={30} fill="#f8ea06" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-lg text-gray-300 font-bold">
                  {(
                    data?.reduce((acc, curr) => (acc += curr.ratings), 0) /
                    data.length
                  ).toFixed(2)}
                </span>
                <span className="text-sm text-gray-300 italic font-extralight">
                  {data.length} count
                </span>
              </div>
            </div>
          )}
          {!isRated && (
            <div className=" w-full flex items-center space-x-3">
              <span className="text-white">Add Review:</span>
              <div className="">
                {[...Array(5)].map((item, i) => {
                  return (
                    <button
                      className={`${
                        i + 1 <= (rating || hover)
                          ? "text-amber-300"
                          : "text-white"
                      } bg-transparent border-none outline-none cursor-pointer text-3xl`}
                      type="button"
                      key={i}
                      onClick={() => {
                        submitRating(i + 1)
                      }}
                      onMouseEnter={() => setHover(i + 1)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
        <div className="w-1/2 mx-auto">
        <Modal open={model} onCancel={() => setModel(!model)} style={{width:600,height:300}} footer={null}>
          <Form name="reviews" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{marginRight:20,marginTop:20}} onFinish={submitReview} form={form}>
            <Form.Item
              label="Title"
              name={"title"}
              rules={[{ required: true, message: "Please input title" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Review Text"
              name={"review"}
              rules={[{ required: true, message: "Please input Review" }]}
            >
              <TextArea />
            </Form.Item>
           <Form.Item>
           <Button type="primary" htmlType="submit" style={{float:'right',backgroundColor:'red'}}>Submit</Button>
           </Form.Item>
          </Form>
          
        </Modal>
        </div>
        <div className="w-1/2 mt-5">
          <div className="flex justify-start space-x-64">
            <span className="text-2xl text-white font-bold">Reviews</span>
            <Button
              type="primary"
              style={{ background: "red" }}
              onClick={() => setModel(!model)}
            >
              Add Review
            </Button>
          </div>
          <div>
            {reviews.data.map((item, i) => {
              const {
                user,
                postedAt,
                comments: { title, body },
              } = item
              const userName = users.filter((item) => item._id === user)
              return (
                <div
                  className="review--container flex justify-start space-x-4 mt-5 "
                  key={i}
                >
                  <div>
                    <RxAvatar size={40} className="text-white" />
                  </div>
                  <div className="flex flex-col items-start space-y-4">
                    <span className=" font-bold text-lg text-gray-300">
                      {userName[0]?.name}
                    </span>
                    <span className="font-bold  text-slate-500">{title}</span>
                    <span className="font-light  text-gray-500">{body}</span>
                    <span className="font-light  text-gray-500 py-5">
                      PostedAt: {new Date(postedAt).toDateString()}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieReview
