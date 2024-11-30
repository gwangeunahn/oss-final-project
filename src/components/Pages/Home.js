import React from 'react'

export default function Home() {
  return (
    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
        <div class="col-md-6 p-lg-5 mx-auto my-5">
        <h1 class="display-3 fw-bold">완졸(WanJol)</h1>
        <h3 class="fw-normal text-muted mb-3">"완벽한 졸업"의 줄임말로, 한국어로 간결하고 친근한 느낌</h3>
        <div class="d-flex gap-3 justify-content-center lead fw-normal">
            <a class="icon-link" href="#">
                선택1
            <svg class="bi"></svg>
            </a>
            <a class="icon-link" href="#">
                선택2
            <svg class="bi"></svg>
            </a>
        </div>
        </div>
    <div class="product-device shadow-sm d-none d-md-block"></div>
    <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
  </div>
  )
}
