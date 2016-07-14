import * as types from '../constants/ActionTypes'

const initialState = {
  item: {},
  error: null,
  loading: 'hide'
}

export default function (state = initialState, action) {
  switch (action.type) {

    case types.DEVICE_FETCH:
      return {
        ...state,
        loading: 'loading'
      }
    case types.DEVICE_FETCH_SUCCEEDED:
      return {
        ...state,
        item: action.data[0],
        loading: 'hide'
      }
    case types.DEVICE_FETCH_FAILED:
      return {
        ...state,
        item: null,
        error: action.data,
        loading: 'hide'
      }

    case types.DEVICE_DELETE:
      return {
        ...state,
        loading: 'loading'
      }
    case types.DEVICE_DELETE_SUCCEEDED:
      return {
        ...state,
        item: {},
        loading: 'hide'
      }
    case types.DEVICE_DELETE_FAILED:
      return {
        ...state,
        error: action.data,
        loading: 'hide'
      }

    default:
      return state
  }
}
