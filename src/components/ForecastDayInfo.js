
function ForecastDayInfo(props) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    console.log(props.cityData)
    // get HTML for the forecast of the days 
    let forecasts
    if (props.cityData.forecast){
        forecasts = props.cityData.forecast.forecastday.map((oneForecast, index) => {
        let dayDate = new Date(oneForecast.date + "T12:00:00Z")
        return (
            <div className="forecastInfo" key={index} onClick={() => props.setSelectedForecast(index)}>
                <p>{days[dayDate.getDay()]}</p>
                <img src={oneForecast.day.condition.icon} alt="" />
                <br /> <br />
                <h3>H: {oneForecast.day.maxtemp_f}°</h3>
                <h3>L: {oneForecast.day.mintemp_f}°</h3>
            </div>
        )
    })}

    // gets user selected forcast
    let selectedDayInfo = props.cityData.forecast.forecastday[props.selectedForecast]
    let selectedDayDate = new Date(selectedDayInfo.date + "T12:00:00Z")
    return (
        <>
            <div>
                <h2 style={{ marginLeft: '30px' }}>
                    Forecasts
                </h2>
                <div className="allForecasts">
                    {forecasts}
                </div>
            </div>
            <div style={{width: '100%'}}>
                <h2>{days[selectedDayDate.getDay()]}'s Forecast</h2>
                <div className='selectedDayInfo'>
                    <div className='makeFlex'>
                        <img src={selectedDayInfo.day.condition.icon} alt="" className='defaultMargin' style={{height: '100px'}}/>
                        <div style={{margin: '10px'}}>
                            <h2>H: {selectedDayInfo.day.maxtemp_f}°</h2>
                            <h2>L: {selectedDayInfo.day.mintemp_f}°</h2>
                        </div>
                    </div>
                    <div className='makeFlex forecastElements'>
                        <div className='defaultMargin'>
                            <p>Chance of Rain</p>
                            <h4>{selectedDayInfo.day.daily_chance_of_rain}%</h4>
                        </div>
                        <div className='defaultMargin'>
                            <p>Total Precipitation</p>
                            <h4>{selectedDayInfo.day.totalprecip_in} in</h4>
                        </div>
                        <div className='defaultMargin'>
                            <p>Average Humidity</p>
                            <h4>{selectedDayInfo.day.avghumidity}%</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForecastDayInfo