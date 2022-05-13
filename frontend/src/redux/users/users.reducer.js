import { GET_USERS, GET_USER, USER_ERROR, LOADING_USER } from "./users.types"

const initialState = {
  users: [],
  user: null,
  loading: true,
  error: {},
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      }
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
