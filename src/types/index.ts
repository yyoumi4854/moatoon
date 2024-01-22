export type Service = "naver" | "kakao" | "kakaoPage";
export type UpdateDays =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun"
  | "finished"
  | "naverDaily";
export type Singularity = "over15" | "free" | "waitFree";

export interface WebtoonQueryParams {
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
