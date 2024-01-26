import Image from "next/image";
import Link from "next/link";

import { Inter } from "next/font/google";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getWebtoonsRequest } from "@/redux/actions";

import * as types from "@/types";

const inter = Inter({ subsets: ["latin"] });

const services = {
  naver: { text: "네이버 웹툰", color: "bg-green-500" },
  kakao: { text: "카카오 웹툰", color: "bg-zinc-400" },
  kakaoPage: { text: "카카오페이지", color: "bg-yellow-400" },
};

const updateDays = [
  { text: "월", updateDay: "mon" },
  { text: "화", updateDay: "tue" },
  { text: "수", updateDay: "wed" },
  { text: "목", updateDay: "thu" },
  { text: "금", updateDay: "fri" },
  { text: "토", updateDay: "sat" },
  { text: "일", updateDay: "sun" },
  { text: "완결", updateDay: "finished" },
];

export default function Home() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state: any) => state);
  const [requestParams, setRequestParams] = useState<types.WebtoonQueryParams>({
    page: 1,
    perPage: 10,
    // service: "",
    // updateDay: "",
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
      <div className="bg-blue-500 text-white p-4">
        <h2>Service: {requestParams && requestParams.service}</h2>
        <h2>Update Day: {requestParams && requestParams.updateDay}</h2>
      </div>

      <header>
        <div className="flex flex-row justify-between py-3 max-w-screen-lg mx-auto">
          <div className="flex flex-row gap-6 max-w-screen-lg">
            <h1>모아툰</h1>

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
              <li key={updateDay.updateDay}>
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
            data.webtoons.map((webtoon: types.Webtoon) => (
              <li key={webtoon._id}>
                <Link href={webtoon.url}>
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
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
