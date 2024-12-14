import React from 'react'
import Banner from '../../Img/banner.png'
import BannerMobile from '../../Img/bannerMobile.png'

export default function Home() {
  return (
    <div class="position-relative overflow-hidde text-center">
      {/* 배너 */}
      <img id='banner' src={Banner} alt="Banner" style={{ maxWidth: '100%', height: 'auto' }} />
      <img id='bannerMobile' src={BannerMobile} alt="BannerMobile" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  )
}
