import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'
import requester from '../utils'

function* discovery(action) {
  const { response, error } = yield call(requester, action.method, action.resource)
  if (response)
    yield put({ type: types.SETTINGS_DISCOVERY_SUCCEEDED , data: response.data })
  else
    yield put({ type: types.SETTINGS_DISCOVERY_FAILED , data: error })
}

export function* settingsSaga() {
  yield* takeEvery( types.SETTINGS_DISCOVERY_REQUESTED , discovery)
}