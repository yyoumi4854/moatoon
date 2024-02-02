import Image from "next/image";
import Link from "next/link";

import { Inter } from "next/font/google";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getWebtoonsRequest } from "@/redux/actions";

import * as types from "@/types";
import { useInView } from "react-intersection-observer";

const inter = Inter({ subsets: ["latin"] });

const services = {
  naver: { text: "네이버 웹툰", color: "bg-green-500" },
  kakao: { text: "카카오 웹툰", color: "bg-zinc-400" },
  kakaoPage: { text: "카카오페이지", color: "bg-yellow-400" },
};

const updateDays = [
  { text: "전체", updateDay: undefined, id: "all" },
  { text: "월", updateDay: "mon", id: "mon" },
  { text: "화", updateDay: "tue", id: "tue" },
  { text: "수", updateDay: "wed", id: "wed" },
  { text: "목", updateDay: "thu", id: "thu" },
  { text: "금", updateDay: "fri", id: "fri" },
  { text: "토", updateDay: "sat", id: "sat" },
  { text: "일", updateDay: "sun", id: "sun" },
  { text: "완결", updateDay: "finished", id: "finished" },
];

/*
현재 페이지 -> 데이터에 출력되는 페이지
page=1 -> page=1
page=2 -> page=1, page=2
page=3 -> page=2
page=4 -> page=3
(왜이러는지 모르겠다...)

page는 인지가 아주 잘된다. -> payload에 잘 찍힘

0 10 30
 */

export default function Home() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state: any) => state);

  // 데이터 요청을 위한 파라미터
  const [requestParams, setRequestParams] = useState<types.WebtoonQueryParams>({});
  // 페이지 번호
  const [page, setPage] = useState(1);


  const [dataWebtoons, setDataWebtoons] = useState<types.Webtoon[]>([]); // 무한스크롤 하기 위한 웹툰리스트
  const { ref, inView } = useInView();

  // 데이터 요청
  useEffect(() => {
    if (requestParams.page === undefined) {
      return;
    }

    console.log("데이터 요청함 => ", requestParams);
    dispatch(getWebtoonsRequest(requestParams as types.WebtoonQueryParams));
  }, [dispatch, requestParams]);

  // 데이터를 가져온 후에 dataWebtoons 상태에 저장합니다.
  useEffect(() => {
    if (loading) {
      console.log("데이터 가져오는 중...");
      return;
    }

    if (data && data.webtoons.length === 0) {
      console.log("데이터가 없음");
      return;
    }

    if (!loading && data) {
      console.log("데이터 가져옴 => ", data);
      setDataWebtoons((prev) => [...prev, ...data.webtoons]);
    }
  }, [data, loading]);

  // 스크롤이 끝까지 내려가면 page+1 해주기
  useEffect(() => {
    if (inView) {
      console.log("스크롤 끝까지 내려감!!");
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    console.log("페이지 변경됨 => ", page);
    handleAddPage(page);
  }, [page]);

  // service 클릭
  const handleServiceButtonClick = (service: types.Service) => {
    // dataWebttons, page 리셋
    setDataWebtoons([]);
    setPage(1);

    setRequestParams(() => ({
      service,
    }));
  };

  // updateDays 클릭
  const handleDayButtonClick = (updateDay: types.UpdateDays) => {
    // dataWebttons, page 리셋
    setDataWebtoons([]);
    setPage(1);

    setRequestParams((prevParams) => ({
      ...prevParams,
      updateDay,
    }));
  };

  const handleAddPage = (page: number) => {
    setRequestParams((prevParams) => ({
      ...prevParams,
      page,
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
      <div className="bg-blue-500 text-white p-4">
        <h2>Service: {requestParams && requestParams.service}</h2>
        <h2>Update Day: {requestParams && requestParams.updateDay}</h2>
      </div>

      <header>
        <div className="flex flex-row justify-between py-3 max-w-screen-lg mx-auto">
          <div className="flex flex-row gap-6 max-w-screen-lg">
            <h1>
              <button
                className="font-bold"
                onClick={() => handleServiceButtonClick(undefined as any)}
              >
                모아툰
              </button>
            </h1>

            <nav>
              <ul className="flex flex-row gap-4 list-none">
                {Object.keys(services).map((service) => (
                  <li key={service}>
                    <button
                      className="px-1 py-0.5 font-bold"
                      onClick={() =>
                        handleServiceButtonClick(service as types.Service)
                      }
                    >
                      {services[service as types.Service].text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="border">
            <input type="text" className="px-4 py-1" />
            <button>검색</button>
          </div>
        </div>
        <hr />

        <nav className="max-w-screen-lg mx-auto">
          <ul className="flex flex-row gap-4 py-2 list-none">
            {updateDays.map((updateDay) => (
              <li key={updateDay.id}>
                <button
                  className="px-1 py-0.5"
                  onClick={() =>
                    handleDayButtonClick(
                      updateDay.updateDay as types.UpdateDays
                    )
                  }
                >
                  {updateDay.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <hr />
      </header>

      <div className="pt-8">
        <ul className="grid grid-cols-5 gap-4 max-w-screen-lg mx-auto">
          {data &&
            dataWebtoons.map((webtoon: types.Webtoon, idx) => (
              <li key={idx}>
                <Link href={webtoon.url} className="cursor-pointer">
                  <div className="relative rounded border border-slate-200 truncate">
                    <img
                      src={webtoon.img}
                      alt={webtoon.title}
                      className="w-full h-60 bg-slate-100 object-cover object-top"
                    />

                    <div className="absolute top-0 left-0">
                      {webtoon.additional.new && (
                        <i className="px-1 py-0.5 not-italic bg-blue-500 text-white">
                          신작
                        </i>
                      )}

                      {webtoon.additional.up && (
                        <i className="px-1 py-0.5 not-italic bg-red-500 text-white">
                          up
                        </i>
                      )}
                    </div>
                    <div className="absolute top-0 right-0">
                      {webtoon.additional.adult && (
                        <i className="px-1 py-0.5 not-italic bg-orange-500">
                          19
                        </i>
                      )}
                      {webtoon.additional.singularityList.includes(
                        "over15"
                      ) && (
                        <i className="px-1 py-0.5 not-italic bg-sky-600">15</i>
                      )}
                    </div>

                    <i
                      className={`absolute bottom-0 right-0 px-1 py-0.5 not-italic ${
                        services[webtoon.service].color
                      }`}
                    >
                      {services[webtoon.service].text}
                    </i>
                  </div>
                </Link>
                <div>
                  <p className="font-bold">{webtoon.title}</p>
                  <p>{webtoon.author}</p>
                  <p>{webtoon.updateDays}</p>
                </div>
              </li>
            ))}
          <div ref={ref}>로딩할꺼임</div>
        </ul>
      </div>
    </>
  );
}
