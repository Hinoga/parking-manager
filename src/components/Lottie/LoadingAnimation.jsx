import React from 'react'
import Lottie from 'react-lottie'
import animationData from './json/load-traffic.json'

export const LoadingAnimation = _ => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData
  }

  return <Lottie options={defaultOptions} height={400} width={400} />
}

export default LoadingAnimation
