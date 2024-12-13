import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function MyInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const userDelete = async () => {
    const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까? 탈퇴 시 해당 정보가 완전히 삭제됩니다.");

    if (isConfirmed) {
      try {
        await axios.delete("https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/Students/" + id);
        alert("탈퇴되었습니다.");
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
        alert("죄송합니다. 잠시후 시도해주세요.");
      }
    }
  };

  useEffect(() => {
    if (!id) {
      alert("로그인을 해주세요.");
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/Students/` + id);
          setUserInfo(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    }
  }, []);

  if (!userInfo) {
    return <div className="text-center">Loading...</div>;
  }

  const { studentNumber, password, ...semesters } = userInfo;

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-7">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">나의 정보</h3>
        <div>
          <a href={"/user/updateInfo/" + id} className="nav-link d-inline-block me-3">
            수정하기
          </a>
          <a className="nav-link d-inline-block" href="javascript:;" onClick={userDelete}>
            탈퇴하기
          </a>
        </div>
      </div>

      {/* 학기별 정보 */}
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
                      {/* 상세 보기 출력 */}
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
