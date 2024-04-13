import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import CityPreview from './components/CityPreview'
import CityInformation from './components/CityInformation'
import ForecastDayInfo from './components/ForecastDayInfo';
import ForecastHourlyInfo  from './components/ForecastHourlyInfo';


document.body.style.backgroundColor = '#121212'
document.body.style.color = 'white'
document.body.style.fontFamily = 'Helvetica'

function Home() {
  const [cities, setCities] = useState(['tokyo', 'seattle', 'phoenix'])
  const [addedCity, setaddedCity] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [citiesHtml, setCitiesHtml] = useState([])
  const [selectedCityData, setSelectedCityData] = useState(null)
  const [selectedForecast, setSelectedForecast] = useState(0)
  const [failedFetch, setFailedFetch] = useState(false)

  // Fetches the weather data from the weather API
  useEffect(() => {
    cities.forEach((city) => {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=393054b51c934b32b2111341240704&q=${city}&days=4`)
        .then((res) => {
          if (!res.ok) {
            setFailedFetch(true)
            setCities((prevCities) => prevCities.slice(0, -1))
            setWeatherData('')
          }
          return res.json()
        })
        .then((data) => setWeatherData((prevData) => [...prevData, data]))
    })
  }, [cities])

  // returns the HTML for the city options on the top
  useEffect(() => {
    if (weatherData) {
    let newCitiesHtml = weatherData.map((data, index) => {
      if (data && data.current) {
        return (
          <div key={index} className='cityBox' onClick={() => {setSelectedCityData(data);  setSelectedForecast(data.forecast.forecastday[0])}}>
            <h2 className='cityQuickInfo'>{data.location.name}</h2>
            <h2 className='cityQuickInfo'>{data.current.temp_f}°</h2>
          </div>
        )
      }
      return null
    }
    )
    setCitiesHtml(newCitiesHtml)
  }}, [weatherData])

  // handing the form to add new cities
  function onSubmit(event) {
      event.preventDefault()
      setCities((prevCities) => [...prevCities, addedCity])
      setaddedCity('')
      setWeatherData('')
      // sets it to false here, then when fetching from api, if it's fails, then it will set to true later
      setFailedFetch(false)
  }

  return (
    <>
      <form onSubmit={(event) => onSubmit(event)}>
          <input type="text" 
          className='addCityInput'
          placeholder='Add a City'
          required
          value={addedCity}
          onChange={(event) => setaddedCity(event.target.value)}
          />  
          <button className='addCityButton'> Add </button>
          {failedFetch ? <p style={{marginLeft: "20px"}}>Not a City</p> : ''}
      </form>
      <CityPreview weatherData={weatherData} citiesHtml={citiesHtml} />
      <div className='makeFlex defaultMargin'>
        {selectedCityData ? <CityInformation cityData={selectedCityData} /> : 'Select a city'}
        {selectedCityData ? <ForecastDayInfo cityData={selectedCityData} selectedForecast={selectedForecast} setSelectedForecast={setSelectedForecast}/> : ''}
      </div>
      <ForecastHourlyInfo selectedForecast={selectedForecast} setSelectedForecast={setSelectedForecast}/>
    </>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Home />)



