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
  const [cities, setCities] = useState(['tokyo', 'seattle', 'phoenix', 'los angeles', 'kyoto', 'miami', 'rome', 'paris', 'berlin', 'moscow', 'san diego'])
  const [weatherData, setWeatherData] = useState([])
  const [citiesHtml, setCitiesHtml] = useState([])
  const [selectedCityData, setSelectedCityData] = useState(null)
  const [selectedForecast, setSelectedForecast] = useState(0)

  // Fetches the weather data from the weather API
  useEffect(() => {
    cities.forEach((city) => {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=393054b51c934b32b2111341240704&q=${city}&days=4`)
        .then((res) => {
          return res.json()
        })
        .then((data) => setWeatherData((prevData) => [...prevData, data]))
    })
  }, [])

  // returns the HTML for the city options on the top
  useEffect(() => {
    let newCitiesHtml = weatherData.map((data, index) => {
      if (data && data.current) {
        return (
          <div key={index} className='cityBox' onClick={() => { setSelectedCityData(data) }}>
            <h2 className='cityQuickInfo'>{data.location.name}</h2>
            <h2 className='cityQuickInfo'>{data.current.temp_f}°</h2>
          </div>
        )
      }
      return null
    }
    )
    setCitiesHtml(newCitiesHtml)
  }, [weatherData])

  return (
    <>
      <h1> Test </h1>
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



