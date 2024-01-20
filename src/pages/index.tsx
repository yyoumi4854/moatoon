import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
    </>
  );
}
