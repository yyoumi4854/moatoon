/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_DIFF = "counter/SET_DIFF" as const;
const INCREASE = "counter/INCREASE" as const;
const DECREASE = "counter/DECREASE" as const;
// as const는 추후에 액션 생성함수를 통해 액션 객체를 만들게 됐을 때 type의 타입스크립트 타입이 string이 되지 않고 실제값을 가르키게 된다.

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setDiff = (diff: number) => ({ type: SET_DIFF, payload: diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* 액션 객체들에 대한 type */
// 리듀서 작성 시 action 파라미터의 타입을 설정하기 위해
// ReturnType은 함수에서 반환하는 타입을 가져올 수 있게 해주는 유틸 타입
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof setDiff>;
// 액션 타입을 만들 때 as const라는 키워드를 사용했는데 이 작업을 하지 않으면 ReturnType을 사용하게 됐을 때 type의 타입이 무조건 string으로 처리가 된다.
// 그렇게 되면 나중에 리듀서를 제대로 구현할 수 없다.

/* 초기 상태 선언 */
// interface CounterState {
//   number: number;
//   diff: number;
// }
// const initialState: CounterState = {
//   number: 0,
//   diff: 1,
// };
type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function counter(
  state: CounterState = initialState,
  action: CounterAction
) {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case SET_DIFF:
      return { count: state.count + action.payload };
    default:
      return state;
  }
}
