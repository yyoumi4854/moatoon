import { all, call, put, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as webtoonAPI from "@/api/webtoons";
import * as types from "@/types";

/* API 호출 */
/* 
action : {payload:{}, type: ""}
 */
function* getWebtoonsSaga(action) {
  try {
    // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 된다.
    // 액션 생성 함수에서 넘겨줬기 때문에 사용가능
    const { page, perPage, service, updateDay } = action.payload;
    const response = yield call(
      webtoonAPI.getWebtoons,
      page,
      perPage,
      service,
      updateDay
    );
    yield put(actions.getWebtoonsSuccess(response.data));
  } catch (error) {
    yield put(actions.getWebtoonsFailure(error.message));
  }
}

// Watcher saga: 특정 액션을 감시하고 특정 액션이 발생할 때 worker saga를 호출
function* watchGetWebtoons() {
  yield takeEvery(types.GET_WEBTOONS_REQUEST, getWebtoonsSaga);
}

// Root saga: 여러 watcher saga들을 결합
export default function* rootSaga() {
  yield all([watchGetWebtoons()]);
}
