import React, { useEffect, useState } from "react";

export default function SearchJob() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(
      "https://www.career.go.kr/cnet/openapi/getOpenApi.json?apiKey=f5b128d18e12675df10d93c07ae8e532&svcType=api&svcCode=JOB&page=1&perPage=600"
    )
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const content = xmlDoc.getElementsByTagName("content");
        const jobsArray = Array.from(content).map((item) => {
          return {
            job: item.getElementsByTagName("job")[0]?.textContent || "N/A",
            summary: item.getElementsByTagName("summary")[0]?.textContent || "N/A",
            similarJob: item.getElementsByTagName("similarJob")[0]?.textContent || "N/A",
            salery: item.getElementsByTagName("salery")[0]?.textContent || "N/A",
            possibility: item.getElementsByTagName("possibility")[0]?.textContent || "N/A",
          };
        });

        setJobs(jobsArray);
        setFilteredJobs(jobsArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    let filtered = jobs;
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (salaryFilter) {
      filtered = filtered.filter((job) => job.salery.includes(salaryFilter));
    }

    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchTerm, salaryFilter, jobs]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredJobs.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  return (
    <div>
      <h1>직업 정보</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="직업 또는 요약 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "40%",
            marginRight: "20px",
          }}
        />
        <select
          value={salaryFilter}
          onChange={(e) => setSalaryFilter(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
          }}
        >
          <option value="">연봉 필터</option>
          <option value="1천만원">1천만원</option>
          <option value="2천만원">2천만원</option>
          <option value="3천만원">3천만원</option>
          <option value="4천만원">4천만원</option>
          <option value="5천만원">5천만원</option>
        </select>
      </div>

      <div>
        {currentItems.length > 0 ? (
          currentItems.map((job, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h2 style={{ margin: "0 0 10px" }}>{job.job}</h2>
              <p><strong>요약:</strong> {job.summary}</p>
              <p><strong>유사 직업:</strong> {job.similarJob}</p>
              <p><strong>연봉:</strong> {job.salery}</p>
              <p><strong>고용 전망:</strong> {job.possibility}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            검색 조건에 맞는 결과가 없습니다.
          </p>
        )}
      </div>

      {/* 페이지네이션 버튼 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
          gap: "10px", // 버튼 간 간격
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: currentPage === i + 1 ? "#007bff" : "#f0f0f0",
              color: currentPage === i + 1 ? "#fff" : "#000",
              border: "1px solid #ccc",
              cursor: "pointer",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
