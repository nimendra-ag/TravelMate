import React from 'react'
import Hero from '../../components/hero/Hero'
import AiTripPlanning from '../../components/AiTripPlanning/AiTripPlanning'
import HotelsInLandingPage from '../../components/HotelsInLandingPage/HotelsInLandingPage'
import GuideList from '../../components/GuideList/GuideList'

const Home = () => {
  return (
    <>
    <Hero/>
    <AiTripPlanning/>
    <HotelsInLandingPage/>
    <GuideList/>
    </>
  )
}

export default Home