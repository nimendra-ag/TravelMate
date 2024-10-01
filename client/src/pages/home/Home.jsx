import React from 'react'
import Hero from '../../components/hero/Hero'
import AiTripPlanning from '../../components/AiTripPlanning/AiTripPlanning'
import HotelsInLandingPage from '../../components/HotelsInLandingPage/HotelsInLandingPage'
import GuideList from '../../components/GuideList/GuideList'
import Activities from '../../components/activities/Activities'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <>
    <Hero/>
    <AiTripPlanning/>
    <HotelsInLandingPage/>
    <GuideList/>
    <Activities/>
    <Footer/>
    </>
  )
}

export default Home