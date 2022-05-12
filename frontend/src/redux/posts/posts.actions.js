import axios from "axios"

import config from "../../config"
import { setAlert } from "../alert/alert.actions"
import {
  GET_POSTS,
  GET_POST,
  GET_TOP_POSTS,
  GET_TAG_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  ADD_POST_TO_BOOKMARK,
  ADD_POST_TO_BOOKMARK_ERROR,
  ADD_VOTE_TO_POST,
  ADD_VOTE_TO_POST_ERROR
} from "./posts.types"



// Get posts
export const getPosts =
  (searchQuery = "") =>
  async (dispatch) => {
    try {
      const res = await axios.post(config.BASE_URL + "/posts/get-posts", {
        searchq: searchQuery,
      })

      dispatch({
        type: GET_POSTS,
        payload: res.data.data,
      })
    } catch (err) {
      dispatch(setAlert(err.response.data.message, "danger"))

      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }

export const addPostToBookmark = (body) => async (dispatch) => {
  try {
    const res = await axios.post(
      config.BASE_URL + "/questions/add-bookmark",
      body,
    )
    console.log("question add to bookmark", res);
    dispatch({
      type: ADD_POST_TO_BOOKMARK,
      payload: res.data.data,
    })
  } catch (err) {
    dispatch({
      type: ADD_POST_TO_BOOKMARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}


export const addVoteToPost = (body) => async (dispatch) => {
  try {
    console.log("vote body is", body);
    const res = await axios.post(
      config.BASE_URL + "/vote/create-vote",
      body,
    )
    console.log("vote response", res);
    dispatch({
      type: ADD_VOTE_TO_POST,
      payload: res.data.data,
    })
  } catch (err) {
    dispatch({
      type:  ADD_VOTE_TO_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}



// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(config.BASE_URL + `/questions/get-questionbyid/${id}`)

    dispatch({
      type: GET_POST,
      payload: res.data.data,
    })
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"))

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//GET TOP POSTS
export const getTopPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(config.BASE_URL + "/api/posts/top")

    dispatch({
      type: GET_TOP_POSTS,
      payload: res.data.data,
    })
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"))

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//GET TAG POSTS
export const getTagPosts = (tagName) => async (dispatch) => {
  try {
    const res = await axios.get(config.BASE_URL + `/api/posts/tag/${tagName}`)

    dispatch({
      type: GET_TAG_POSTS,
      payload: res.data.data,
    })
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"))

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config_headers = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const res = await axios.post(
      config.BASE_URL + "/api/posts",
      formData,
      config_headers
    )

    dispatch({
      type: ADD_POST,
      payload: res.data.data,
    })

    dispatch(setAlert(res.data.message, "success"))

    dispatch(getPosts())
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"))

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(config.BASE_URL + `/api/posts/${id}`)

    dispatch({
      type: DELETE_POST,
      payload: id,
    })

    dispatch(setAlert(res.data.message, "success"))
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"))

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}