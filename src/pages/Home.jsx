import React from 'react'
import EducationalStages from './educational stages/EducationalStages'
import PlatformContent from './mansa content/PlatformContent'
import Hero from './hero/Hero'

const Home = () => {
  return (
    <>
    <Hero />
    <PlatformContent />
    <div className='container1'>
      <EducationalStages />  
    </div>
    </>
  )
}

export default Home