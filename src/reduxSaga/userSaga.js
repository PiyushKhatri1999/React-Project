import { takeEvery, put } from 'redux-saga/effects';
import {SET_USER_LIST,DASH_BOARD,USER_LIST} from "../constants/constants";
export function* getUsers() {
    const myObject=yield fetch(DASH_BOARD)
    let myText=yield myObject.text();
  var data=JSON.parse(myText).data;
    yield put({type: SET_USER_LIST, data})
}

function* userSaga() {
    yield takeEvery(USER_LIST, getUsers)
}

export default userSaga;