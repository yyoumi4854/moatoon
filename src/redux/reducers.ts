import * as actionTypes from "@/redux/actionTypes";

// 초기 상태 정의
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// 리듀서 정의
const webtoonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WEBTOONS_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.GET_WEBTOONS_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case actionTypes.GET_WEBTOONS_FAILURE:
      return { ...state, loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

export default webtoonsReducer;
