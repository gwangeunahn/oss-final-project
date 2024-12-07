import React from 'react'
import Banner from '../../Img/banner.png'

export default function Home() {
  return (
    <div class="position-relative overflow-hidde text-center">
      {/* 배너 */}
      <img src={Banner} alt="완졸 배너" class="img-fluid mb-3" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  )
}
