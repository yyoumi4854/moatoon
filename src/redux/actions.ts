import * as actionTypes from "@/redux/actionTypes";
import * as types from "@/types";

// 액션 생성 함수
export const getWebtoonsRequest = (page: number, perPage: number, service: string, updateDay: string) => ({
  type: actionTypes.GET_WEBTOONS_REQUEST,
  payload: { page, perPage, service, updateDay },
});
export const getWebtoonsSuccess = (webtoons: any) => ({
  type: actionTypes.GET_WEBTOONS_SUCCESS,
  payload: webtoons,
});
export const getWebtoonsFailure = (error: any) => ({
  type: actionTypes.GET_WEBTOONS_FAILURE,
  payload: error,
});
