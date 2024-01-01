import React from 'react'
import WeatherApp from './weatherapp/App.jsx'
const Features = () => {
  return (
    <div className=' flex w-full gap-4 h-full px-2 pt-2 overflow-scroll flex-col'>
      {/* <Profilesection/> */}
      <WeatherApp/>
      {/* <LatestNews/> */}
      {/* <Suggestions/> */}
    </div>
  )
}

export default Features