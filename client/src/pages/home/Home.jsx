import React from 'react'
import Hero from '../../components/hero/Hero'
import AiTripPlanning from '../../components/AiTripPlanning/AiTripPlanning'
import HotelsInLandingPage from '../../components/HotelsInLandingPage/HotelsInLandingPage'
import GuideList from '../../components/GuideList/GuideList'
import Activities from '../../components/activities/Activities'
import Footer from '../../components/footer/Footer'
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm'
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection'
import RestaurantsInLandingPage from '../../components/RestaurantInLandingPage/RestaurantsInLandingPage'
import RestaurantCategoriesCards from '../../components/RestaurantCategoriesCards/RestaurantCategoriesCards'
import PrePlannedTripsInLandingPage from '../../components/prePlannedTripsInLandingPage/PrePlannedTripsInLandingPage'

const Home = () => {
  return (
    <>
    <Hero/>
    <RestaurantCategoriesCards/>
    <PrePlannedTripsInLandingPage/>
    <AiTripPlanning/>
    <HotelsInLandingPage/>
    <RestaurantsInLandingPage/>
    <GuideList/>
    <Activities/>
    <FeedbackSection/>
    <FeedbackForm/>
    <Footer/>
    </>
  )
}

export default Home