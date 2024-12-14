import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function MyInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [classes, setClasses] = useState([]);
  const [gpa, setGpa] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const gradeToPoint = {
    "A+": 4.5,
    "A0": 4.0,
    "B+": 3.5,
    "B0": 3.0,
    "C+": 2.5,
    "C0": 2.0,
    "D+": 1.5,
    "D0": 1.0,
    "F": 0.0,
  };

  // 탈퇴함수
  const userDelete = async () => {
    const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까? 탈퇴 시 해당 정보가 완전히 삭제됩니다.");
    if (isConfirmed) {
      try {
        await axios.delete(`https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/Students/` + id);
        alert("탈퇴되었습니다.");
        navigate("/");
      } catch (error) {
        console.error("userDelete error : ", error);
        alert("죄송합니다. 잠시 후 시도해주세요.");
      }
    }
  };

  // 학점계산기
  const calculateGPA = (semesters) => {
    if (!classes.length) return null;

    let totalPoints = 0;
    let totalCredits = 0;

    Object.keys(semesters).forEach((key) => {
      const semesterSubjects = semesters[key];
      if (!Array.isArray(semesterSubjects)) return;

      semesterSubjects.forEach((subject) => {
        const subjectName = subject.subject.replace(/\s/g, "");
        const classData = classes.find((cls) => cls.name.replace(/\s/g, "") === subjectName);

        if (classData && subject.grade !== "P") {
          const gradePoint = gradeToPoint[subject.grade] || 0;
          totalPoints += gradePoint * classData.credit;
          totalCredits += classData.credit;
        }
      });
    });

    const gpaResult = totalCredits ? (totalPoints / totalCredits).toFixed(2) : null;
    return gpaResult;
  };

  // 정보 불러오기
  useEffect(() => {
    if (!id) {
      alert("로그인을 해주세요.");
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const [studentResponse, classResponse] = await Promise.all([
            axios.get(`https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/Students/`+ id),
            axios.get("https://672818a9270bd0b975544f0f.mockapi.io/api/v1/class"),
          ]);

          const studentData = studentResponse.data;

          setUserInfo(studentData);
          setClasses(classResponse.data);

          const calculatedGpa = calculateGPA(studentData);
          setGpa(calculatedGpa);
        } catch (error) {
          console.error("useEffect error : ", error);
        }
      };
      fetchData();
    }
  }, [id, userInfo, classes]);

  if (!userInfo || !classes.length) {
    return <div className="text-center">Loading...</div>;
  }

  const { studentNumber, password, ...semesters } = userInfo;

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-7">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">나의 정보</h3>

        {/* 수정하기, 탈퇴하기 */}
          <div>
            <a href={`/user/updateInfo/${id}`} className="nav-link d-inline-block me-3"> 수정하기 </a>
            <a className="nav-link d-inline-block" href="javascript:;" onClick={userDelete}> 탈퇴하기 </a>
          </div>
        </div>

        {/* 평점 표시 */}
        <div className="mb-4">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>평점</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{gpa || "계산 중..."}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 학기별 내 정보 */}
        <div className="accordion" id="semesterAccordion">
          {[1, 2, 3, 4].map((year) => (
            <div className="accordion-item mb-3" key={year}>
              <h2 className="accordion-header" id={`headingYear${year}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseYear${year}`}
                  aria-expanded="true"
                  aria-controls={`collapseYear${year}`}
                >
                  {year}학년
                </button>
              </h2>
              <div
                id={`collapseYear${year}`}
                className="accordion-collapse collapse show"
                aria-labelledby={`headingYear${year}`}
              >
                <div className="accordion-body">
                  <div className="row">
                    {[1, 2].map((semester) => (
                      <div className="col-6" key={semester}>
                        <div className="mt-3">
                          <h5>{`${year}학년 ${semester}학기`}</h5>
                          <table className="table table-bordered text-center">
                            <thead className="table-light">
                              <tr>
                                <th>과목명</th>
                                <th>성적</th>
                              </tr>
                            </thead>
                            <tbody>
                              {semesters[`${year}-${semester}`]?.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.subject}</td>
                                  <td>{item.grade}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
