import axios from "axios"

import config from "../../config"
import { setAlert } from "../alert/alert.actions"
import {
  GET_COMMENTS,
  COMMENT_ERROR,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_ANSWER_COMMENTS,
  LOADING_COMMENT,
} from "./comments.types"
import {getAnswers} from "../answers/answers.actions"

export const getComments =
  (id, type = "question") =>
  async (dispatch) => {
    try {
      dispatch({ type: LOADING_COMMENT })
      const res = await axios.get(
        config.BASE_URL + `/comment/get-comment-by-resourceid/${id}`
      )
      console.log("comments data", res)
      if (type === "answer") {
        dispatch({
          type: GET_ANSWER_COMMENTS,
          payload: res.data.data.data,
        })
      } else {
        dispatch({
          type: GET_COMMENTS,
          payload: res.data.data.data,
        })
      }
    } catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }

// Add COMMENT
export const addComment = (formData) => async (dispatch) => {
  const config_headers = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const res = await axios.post(
      config.BASE_URL + `/comment/post-comment`,
      formData,
      config_headers
    )

    dispatch({
      type: ADD_COMMENT,
      payload: res.data.data,
    })
    console.log("Add Comment", res.data.data)
    dispatch(setAlert(res?.data?.data?.data?.message, "success"))

    formData.resourceType === "ans" ? dispatch(getAnswers(formData?.questionId)) : dispatch(getComments(formData.resourceId))

  } catch (err) {
    // dispatch(setAlert(err.response.data.message, 'danger'));
    console.log("error is", err)
    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete Comment
export const deleteComment = (CommentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      config.BASE_URL + `/api/posts/comments/${CommentId}`
    )

    dispatch({
      type: DELETE_COMMENT,
      payload: CommentId,
    })

    dispatch(setAlert(res?.data?.data?.data?.message, "success"))
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"))

    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
