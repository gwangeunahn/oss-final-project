import React from 'react'
import { useParams } from 'react-router-dom';

export default function HeaderIn() {
  const { id } = useParams();
  return (
    <header className="d-flex flex-wrap justify-content-center py-3">
      <a href={"/user/"+id} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none col-3">
        <span className="fs-2">WanJol</span>
      </a>
      <ul className="nav nav-pills col-7">
        <li className="nav-item"><a href={"/user/serviceInfo/"+id} className="nav-link">서비스 소개</a></li>
        <li className="nav-item"><a href={"/user/graduation/"+id} className="nav-link">졸업 요건</a></li>
        <li className="nav-item"><a href={"/user/search/"+id} className="nav-link">직업 탐색</a></li>
        <li className="nav-item"><a href={"/user/myInfo/"+id} className="nav-link">나의 정보</a></li>
      </ul>
      <div className="nav-item col-1">
      <a href="/" className="btn rounded-pill" aria-current="page">로그아웃</a>
      </div>
    </header>
  )
}
