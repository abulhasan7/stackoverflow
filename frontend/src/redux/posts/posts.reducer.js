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
  ADD_VOTE_TO_POST_ERROR,
  LOADING_POST,
} from "./posts.types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case LOADING_POST:
      return {
        ...state,
        loading: true,
      };
    case ADD_POST_TO_BOOKMARK:
      return state;
    case ADD_POST_TO_BOOKMARK_ERROR:
    case ADD_VOTE_TO_POST:
      return state;
    case ADD_VOTE_TO_POST_ERROR:
    case GET_TOP_POSTS:
    case GET_POSTS:
    case GET_TAG_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
