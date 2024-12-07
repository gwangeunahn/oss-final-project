import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PagesCss/Graduation.css';

export default function Graduation() {
  const [credits, setCredits] = useState({
    '신앙 및 세계관': 0,
    '인성 및 리더십': 0,
    '실무영어': 0,
    '전문교양': 0,
    'BSM': 0,
    'ICT융합기초': 0,
    '자유선택': 0,
    '전공': 0,
  });

  const [selectedType, setSelectedType] = useState(null); // 클릭된 항목의 상세 정보 상태
  const [classDetails, setClassDetails] = useState([]); // 선택된 항목에 대한 수업 정보
  const { id } = useParams(); // URL에서 studentId 가져오기

  useEffect(() => {
    if (!id) {
      setCredits({
        '신앙 및 세계관': 0,
        '인성 및 리더십': 0,
        '실무영어': 0,
        '전문교양': 0,
        'BSM': 0,
        'ICT융합기초': 0,
        '자유선택': 0,
        '전공': 0,
      });
    } else {
      // 학생 정보 가져오기
      axios
        .get(`https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/Students/${id}`)
        .then((studentResponse) => {
          const studentData = studentResponse.data;
          const studentSubjects = [];

          // 학생의 수강 과목 추출
          Object.keys(studentData).forEach((key) => {
            if (key.includes('-')) {
              studentData[key].forEach((course) => {
                if (course.subject) {
                  studentSubjects.push(course.subject);
                }
              });
            }
          });

          // 과목 데이터 가져와서 학점 계산
          axios
            .get('https://672818a9270bd0b975544f0f.mockapi.io/api/v1/class')
            .then((classResponse) => {
              const classData = classResponse.data;
              const calculatedCredits = { ...credits };

              classData.forEach((course) => {
                if (studentSubjects.includes(course.name.trim())) {
                  if (calculatedCredits[course.type]) {
                    calculatedCredits[course.type] += course.credit;
                  } else {
                    calculatedCredits[course.type] = course.credit;
                  }
                }
              });

              setCredits(calculatedCredits);
            })
            .catch((error) => {
              console.error('Error fetching class data:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching student data:', error);
        });
    }
  }, [id]);

  // 과목 클릭 시 상세 정보 표시
  const handleDetailClick = (type) => {
    setSelectedType(type);
    axios
      .get(`https://672818a9270bd0b975544f0f.mockapi.io/api/v1/class?type=${encodeURIComponent(type)}`)
      .then((response) => {
        setClassDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching class details:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="table-responsive col-10 mx-auto rounded-3">
        <table className="table table-bordered text-center">
          <thead className="bg-light">
            <tr>
              <th style={{ backgroundColor: '#3026d9', color: '#ffffff' }}>구분</th>
              <th style={{ backgroundColor: '#3026d9', color: '#ffffff' }}>졸업기준(설계)</th>
              <th style={{ backgroundColor: '#3026d9', color: '#ffffff' }}>취득학점(설계)</th>
              <th style={{ backgroundColor: '#3026d9', color: '#ffffff' }}>판정</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: '신앙 및 세계관', criteria: 9 },
              { type: '인성 및 리더십', criteria: 6 },
              { type: '실무영어', criteria: 9 },
              { type: '전문교양', criteria: 5 },
              { type: 'BSM', criteria: 10 },
              { type: 'ICT융합기초', criteria: 2 },
              { type: '자유선택', criteria: 9 },
              { type: '전공', criteria: 12 },
            ].map((category, index) => (
              <tr key={index}>
                <td className="fw-bold">
                  <span
                    style={{ color: '#3026d9', cursor: 'pointer' }}
                    onClick={() => handleDetailClick(category.type)}
                  >
                    {category.type}
                  </span>
                </td>
                <td>{category.criteria}</td>
                <td>{credits[category.type] || 0}</td>
                <td>
                  {credits[category.type] >= category.criteria ? (
                    <span className="text-success fw-bold">합격</span>
                  ) : (
                    <span className="text-danger fw-bold">불합격</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 선택된 과목의 상세 정보를 표시 */}
      {selectedType && (
        <div className="mt-4 col-10 mx-auto">
          <h3>{selectedType} - 강의 목록</h3>
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>강의명</th>
                  <th>학점</th>
                  <th>전공</th>
                </tr>
              </thead>
              <tbody>
                {classDetails.length > 0 ? (
                  classDetails.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.credit}</td>
                      <td>{item.major}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">해당 항목에 대한 정보가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
