import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // API 호출
      const response = await axios.get('https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/Students');
      const students = response.data;

      // 학번과 비밀번호 일치하는 데이터 찾기
      const matchedStudent = students.find(
        (student) => student.studentNumber === studentNumber && student.password === password
      );

      if (matchedStudent) {
        // 성공 시 해당 ID로 이동
        navigate(`/User/${matchedStudent.id}`);
      } else {
        // 실패 시 오류 메시지 설정
        setErrorMessage('학번 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류가 발생했습니다:', error);
      setErrorMessage('서버와의 통신에 문제가 발생했습니다.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <h1 className="text-center mb-4">로그인</h1>
      </div>

      {/* 로그인 폼 */}
      <div className="d-flex justify-content-center">
        <div className="border border-2 rounded-3 p-4 col-12 col-md-4">
          {/* 학번 */}
          <div className="mb-3">
            <input
              id="StudentNumber"
              className="form-control"
              type="text"
              placeholder="학번"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
            />
          </div>

          {/* 비밀번호 */}
          <div className="mb-3">
            <input
              id="Password"
              className="form-control"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 오류 메시지 */}
          {errorMessage && (
            <div className="text-danger mb-3 text-center">
              {errorMessage}
            </div>
          )}

          {/* 로그인 버튼 */}
          <div className="d-flex justify-content-center p-1">
            <button className="btn w-100" onClick={handleLogin}>
              로그인
            </button>
          </div>
          <div className="d-flex justify-content-center p-1">
            <a href="/signup" className="nav-link w-100">
              <button className="btn w-100">회원가입</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
