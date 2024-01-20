import * as actionTypes from "@/redux/actionTypes";

// 액션 생성 함수
export const getWebtoonsRequest = (page, perPage, service, updateDay) => ({
  type: actionTypes.GET_WEBTOONS_REQUEST,
  payload: { page, perPage, service, updateDay },
});
export const getWebtoonsSuccess = (webtoons) => ({
  type: actionTypes.GET_WEBTOONS_SUCCESS,
  payload: webtoons,
});
export const getWebtoonsFailure = (error) => ({
  type: actionTypes.GET_WEBTOONS_FAILURE,
  payload: error,
});
