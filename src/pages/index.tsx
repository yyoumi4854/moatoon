import Image from "next/image";
import { Inter } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getWebtoonsRequest } from "@/redux/actions";
import * as types from "@/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state: any) => state);
  const [requestParams, setRequestParams] =
    useState<types.WebtoonQueryParams | null>({
      page: 1,
      perPage: 10,
      service: "kakao",
      updateDay: "mon",
    }); // 나중에 null인 상태로 수정하기

  useEffect(() => {
    dispatch(getWebtoonsRequest(requestParams as types.WebtoonQueryParams));
  }, [dispatch, requestParams]);

  const handleServiceButtonClick = (service: types.Service) => {
    setRequestParams((prevParams) => ({
      ...prevParams,
      service,
    }));
  };

  const handleDayButtonClick = (updateDay: types.UpdateDays) => {
    setRequestParams((prevParams) => ({
      ...prevParams,
      updateDay,
    }));
  };

  if (loading === undefined) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <header>
        <h1>모아툰</h1>
        <nav>
          <ul>
            <li>네이버</li>
            <li>카카오</li>
            <li>카카오페이지</li>
          </ul>
        </nav>
        <nav>
          <li>월</li>
          <li>화</li>
          <li>수</li>
          <li>목</li>
          <li>금</li>
          <li>토</li>
          <li>일</li>
          <li>신작</li>
          <li>성인</li>
          <li>완결</li>
        </nav>
      </header>
      <div>
        <div>탭1 : 전체, 네이버웹툰, 카카오웹툰, 카카오페이지</div>
        <div>요일별 + 완결, 신작</div>
        <div>
          {/* 업데이트 된 순으로 */}
          <ul>
            <li>
              <div>
                <i>신작</i>
                <i>성인/15세 이상</i>
                <i>서비스(네이버, 카카오, 카카오페이지)</i>
              </div>
              <div>
                <p>제목</p>
                <p>작가</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <footer>푸터</footer>

      <div>
        <h1>Webtoons</h1>
        <div>
          <h2>Service: {requestParams && requestParams.service}</h2>
          <button onClick={() => handleServiceButtonClick("naver")}>
            Naver
          </button>
          <button onClick={() => handleServiceButtonClick("kakao")}>
            Kakao
          </button>
          <button onClick={() => handleServiceButtonClick("kakaoPage")}>
            KakaoPage
          </button>
        </div>
        <div>
          <h2>Update Day: {requestParams && requestParams.updateDay}</h2>
          <button onClick={() => handleDayButtonClick("mon")}>Monday</button>
          <button onClick={() => handleDayButtonClick("tue")}>Tuesday</button>
          <button onClick={() => handleDayButtonClick("wed")}>Wednesday</button>
          <button onClick={() => handleDayButtonClick("thu")}>Thursday</button>
          <button onClick={() => handleDayButtonClick("fri")}>Friday</button>
          <button onClick={() => handleDayButtonClick("sat")}>Saturday</button>
          <button onClick={() => handleDayButtonClick("sun")}>Sunday</button>
        </div>
        <ul>
          {data &&
            data.webtoons.map((webtoon: types.Webtoon) => (
              <li key={webtoon._id}>
                <a href={webtoon.url}>
                  <img src={webtoon.img} alt={webtoon.title} />
                </a>
                {webtoon.title} - {webtoon.author}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
