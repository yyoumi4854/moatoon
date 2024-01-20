type Service = "naver" | "kakao" | "kakaoPage";
type UpdateDays =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun"
  | "finished"
  | "naverDaily";
type Singularity = "over15" | "free" | "waitFree";

export interface WEBTOON_QUERY_PARAMS {
  page?: number;
  perPage?: number;
  service?: Service;
  updateDay?: UpdateDays;
}

export interface Webtoon {
  _id: string;
  webtoonId: number;
  title: string;
  author: string;
  url: string;
  img: string;
  service: Service;
  updateDays: UpdateDays[];
  fanCount?: number;
  searchKeyword: string;
  additional: {
    new: boolean;
    rest: boolean;
    up: boolean;
    adult: boolean;
    singularityList: Singularity[] | [];
  };
}

export interface Webtoons {
  createdWebtoonCount: number;
  kakaoPageWebtoonCount: number;
  kakaoWebtoonCount: number;
  lastUpdate?: string;
  naverWebtoonCount: number;
  totalWebtoonCount: number;
  updatedWebtoonCount: number;
  webtoons: Webtoon[];
}

/* 액션 및 상태 타입 */
export interface WebtoonState {
  loading: boolean;
  data?: Webtoons[];
  error?: string;
}

// export type WebtoonsActionTypes =
//   | { type: typeof GET_WEBTOONS_REQUEST }
//   | { type: typeof GET_WEBTOONS_SUCCESS; payload: Webtoons }
//   | { type: typeof GET_WEBTOONS_FAILURE; payload: string };
