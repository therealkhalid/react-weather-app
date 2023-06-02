import React from 'react'
import Search from './components/search/Search'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import CurrentWeathers from './components/currentWeather/CurrentWeathers'
import { WEATHET_API_KEY, WEATHET_API_URL } from './components/Api'
import Forecast from './components/forecaste/Forecaste'
function App() {

  const[curentWeather,setCurrentWeather]=React.useState(null)
  const[forecaste,setForecaste]=React.useState(null)

  const handelOnSearchChange=(searchData)=>{
    const[lat,lon]=searchData.value.split('');
    const currentWatherFetch=fetch(`${WEATHET_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHET_API_KEY}&units=metric`)
    const forecastFetch=fetch(`${WEATHET_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHET_API_KEY}&units=metric`)
    Promise.all([currentWatherFetch,forecastFetch])
    .then(async (response)=>{
      const weatherResponse=await response[0].json();
      const foracasteResponse=await response[1].json();
      setCurrentWeather({city:searchData.label,...weatherResponse});
      setForecaste({city:searchData.label,...foracasteResponse});
    })
    .catch((err)=>console.log(err))
  }

  console.log(curentWeather)
  console.log(forecaste)
  
  return (
    <div className='container  mt-2'>
      <Search onSearchChange={handelOnSearchChange}/>
      { curentWeather && <CurrentWeathers data={curentWeather}/> }
      { forecaste && <Forecast data={forecaste}/> }
    </div>
  )
}

export default App