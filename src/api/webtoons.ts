import axios from "axios";
import * as types from "@/types";

const instance = axios.create({
  baseURL: "https://korea-webtoon-api.herokuapp.com",
  headers: { "X-Custom-Header": "foobar" },
});

// [GET] 웹툰 정보 요청
/*
Parameters:
- options: {
    page: number,
    perPage: number,
    service: "naver" | "kakao" | "kakaoPage",
    updateDay: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | "finished" | "naverDaily"
  }
 */
export const getWebtoons = async ({
  page = 1,
  perPage = 10,
  service,
  updateDay,
}) => {
  const result = instance.get("/", {
    params: {
      perPage,
      page,
      service,
      updateDay,
    },
  });

  return result;
};

// [GET] 웹툰 검색
