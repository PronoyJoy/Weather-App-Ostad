import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {
  
  const [weatherData, setWeatherData] = useState(false)

  const inputRef = useRef(null) 
  
  const getWeatherData = async (city) => {
    
    if(city === ""){
      setWeatherData(false);
      alert("Please enter a city name")
      return;
    }

    try {

      const url = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}`
    
      const response = await fetch(url)
  
      const data = await response.json()
  
      console.log(data)

      setWeatherData({
        humidity : data.current.humidity,
        wind : data.current.wind_kph,
        location: data.location.name,
        country : data.location.country,
        condition: data.current.condition.text,
        condition_icon: data.current.condition.icon,
        temperature: data.current.temp_c,
        feels_like: data.current.feelslike_c,
        icon : "https" + data.current.condition.icon,
      })


      
    } catch (error) {
      console.log(error)
    }
  
  
  }

  useEffect( () => {
    getWeatherData("Dhaka")
  }, [])


  return (

    <div className='weather'>

           {/* searchbar */}

    <div className='search-bar'>
     <input ref={inputRef} type="text" placeholder='Search for a city' />
     <img src={search_icon} alt="search" onClick={() => {getWeatherData(inputRef.current.value)} }/>
    </div>

    { weatherData ? <>
    
      {/* weather info */}
      <img src={weatherData.condition_icon} alt="condition" className='weather-icon'/>

<p className='temperature'>{weatherData.temperature}°</p>
<p className='location'>{weatherData.location}, {weatherData.country}</p>
<p className='condition'>{weatherData.condition}</p>
<p className='feels-like'>Feels like {weatherData.feels_like}°</p>


<div className='weather-data'>


  <div className='col'>

    <img src={humidity_icon} alt='' />

    <div>
      <p> {weatherData.humidity}% </p>
      <span>Humidity</span>
    </div>

  </div>

  <div className='col'>

    <img src={wind_icon} alt='' />

    <div>
    <p> {weatherData.wind} Kph</p>

      <span>Wind Speed</span>
    </div>

  </div>





</div>

{/* forecast */}
    
    
    
    
    </> : <><p className='loading'> loading.....</p></>}

  
          

    </div>
    
  )
}

export default Weather
