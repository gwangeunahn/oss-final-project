import React from 'react';
import ImgInfo from '../../Img/ImgInfo.jpg';

export default function Info() {
  return (
    <div className='contaioner d-flex flex-wrap justify-content-center'>
        <div className='banner col-lg-6 col-md-8 col-sm-10 mb-4'>
            <img src={ImgInfo} alt="Service Info" className='img-fluid rounded'/>
        </div>
        <div className='info col-lg-6 col-md-8 col-sm-10' style={{marginTop: "60px"}}>
            <h3>WanJol(완졸)</h3>
            <p>
                "<strong>완벽한 졸업</strong>"의 줄임말로, 한국어로 간결하면서도 신뢰감을 주는 졸업 지원 서비스입니다.
                WanJol은 체계적이고 직관적인 방식으로 학생들의 졸업 준비를 돕습니다.
            </p>
            <ol>
                <li>
                    <strong>졸업 심사 결과 분석 및 맞춤형 강의 추천</strong>
                    <ul>
                        <li>졸업 요건 항목을 기준으로 현재 학점 상태를 세부적으로 분석합니다.</li>
                        <li>부족한 학점을 충족할 수 있도록 각 항목에 적합한 강의를 추천합니다.</li>
                        <li>기존의 수강 편람을 일일이 검색하지 않아도 필요한 강의를 손쉽게 확인할 수 있습니다.</li>
                    </ul>
                </li>
                <li>
                    <strong>학점 및 평점 관리 도구</strong>
                    <ul>
                        <li>등록된 강의 정보를 기반으로 학기별 평점과 누적 평점을 실시간으로 계산하여 제공합니다.</li>
                    </ul>
                </li>
                <li>
                    <strong>진로 탐색 및 정보 제공</strong>
                    <ul>
                        <li>
                            최신 오픈 API를 활용해 대표적인 직업 및 진로 정보를 체계적으로 제공합니다.
                        </li>
                        <li>미래의 진로 계획에 유용한 참고 자료를 학생들에게 제공합니다.</li>
                    </ul>
                </li>
            </ol>
        </div>
    </div>
  );
}
