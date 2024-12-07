import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [data, setData] = useState({
    1: { 1: [{ subject: '', grade: '' }], 2: [{ subject: '', grade: '' }] },
    2: { 1: [{ subject: '', grade: '' }], 2: [{ subject: '', grade: '' }] },
    3: { 1: [{ subject: '', grade: '' }], 2: [{ subject: '', grade: '' }] },
    4: { 1: [{ subject: '', grade: '' }], 2: [{ subject: '', grade: '' }] },
  });
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleAddRow = (year, semester) => {
    setData((prevData) => ({
      ...prevData,
      [year]: {
        ...prevData[year],
        [semester]: [...prevData[year][semester], { subject: '', grade: '' }],
      },
    }));
  };

  const handleInputChange = (year, semester, index, field, value) => {
    setData((prevData) => {
      const updatedSemester = [...prevData[year][semester]];
      updatedSemester[index][field] = value;

      return {
        ...prevData,
        [year]: {
          ...prevData[year],
          [semester]: updatedSemester,
        },
      };
    });
  };

  const serializeSemesters = (semesters) => {
    const result = {};
    for (const year of Object.keys(semesters)) {
      for (const semester of Object.keys(semesters[year])) {
        result[`${year}-${semester}`] = semesters[year][semester];
      }
    }
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serializedSemesters = serializeSemesters(data);
      await axios.post('https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/Students',
        {
          studentNumber,
          password,
          ...serializedSemesters,
        }
      );
      alert('회원가입이 완료 되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert('죄송합니다. 문제가 발생했습니다.');
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className="col-md-7">
        <h4 className="mb-3">회원가입</h4>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="studentNumber" className="form-label">학번</label>
              <input
                type="number"
                className="form-control"
                id="studentNumber"
                placeholder="StudentNumber"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                required
              />
              <div className="invalid-feedback">학번을 입력해주세요.</div>
            </div>

            <div className="col-sm-6">
              <label htmlFor="password" className="form-label">비밀번호</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="invalid-feedback">비밀번호를 입력해주세요.</div>
            </div>

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
                            <h5>{`${year}학년 ${semester}학기`}</h5>
                            <table className="table table-bordered text-center">
                              <thead className="table-light">
                                <tr>
                                  <th>과목명</th>
                                  <th>성적</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data[year][semester].map((row, index) => (
                                  <tr key={index}>
                                    <td>
                                      <input
                                        className="form-control col-12"
                                        value={row.subject}
                                        onChange={(e) =>
                                          handleInputChange(
                                            year,
                                            semester,
                                            index,
                                            'subject',
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        className="form-control col-8"
                                        value={row.grade}
                                        onChange={(e) =>
                                          handleInputChange(
                                            year,
                                            semester,
                                            index,
                                            'grade',
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td colSpan="2" className="bg-light">
                                    <button
                                      type="button"
                                      className="btn btn-link text-decoration-none"
                                      onClick={() => handleAddRow(year, semester)}
                                    >
                                      추가
                                    </button>
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}