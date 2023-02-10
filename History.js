import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Pagination from "react-js-pagination";

const History = () => {
  //json 데이터 저장 state
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/posts");
        const json = await response.json();
        // data에 json 값 저장
        setData(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //페이징 기능 구현
  const [searchList, setSearchList] = useState();
  const [page, setPage] = useState(1); //현재 페이지
  const [count, setCount] = useState(0); //아이템 총 개수
  const [postPerPage] = useState(10); //페이지당 보여질 아이템 개수
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); //현재 페이지의 마지막 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

  //페이지 구현
  useEffect(() => {
    setCount(searchList?.length);
    setIndexOfLastPost(page * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(searchList?.slice(indexOfFirstPost, indexOfLastPost));
  }, [page, indexOfFirstPost, indexOfLastPost, searchList, postPerPage]);

  //페이지 변경 버튼 클릭 시 이벤트
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div>
      <div class="container my-3">
        <table class="table">
          <thead>
            <tr class="table-dark">
              <th>번호</th>
              <th>machinery</th>
              <th>items</th>
              <th>part1</th>
              <th>logdate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.machinery}</td>
                <td>{item.items}</td>
                <td>{item.part1}</td>
                <td>{item.logdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination
          activePage={page} // 현재 페이지
          itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
          totalItemsCount={count ? count : 0} // 총 아이템 갯수
          pageRangeDisplayed={5} // paginator의 페이지 범위
          prevPageText={"‹"} // "이전"을 나타낼 텍스트
          nextPageText={"›"} // "다음"을 나타낼 텍스트
          onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
        />
      </div>
    </div>
  );
};

export default History;
