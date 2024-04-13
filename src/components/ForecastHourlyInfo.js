
function ForecastHourlyInfo(props) {
    console.log('selectedForecast', props.selectedForecast)
    let hoursList
    // gets the hour by hour data
    if (props.selectedForecast.hour) {
    let time = 11
    let am = true
    hoursList = props.selectedForecast.hour.map((currHour, index) => {
        time++
        if (time === 13){
            time = 1
            if (index != 1){
                am = false
            }
        }
        return (
        <div key={index} className="singleHours">
            <img src={currHour.condition.icon} alt="" />
            {currHour.chance_of_rain != 0 ? <p>{currHour.chance_of_rain}%</p> : <p style={{marginTop: "16px", visibility: "hidden"}}>""</p> }
            {currHour.chance_of_snow != 0 && currHour.chance_of_rain === 0 ? <p>{currHour.chance_of_snow}%</p> : ''}
            <h3>{currHour.temp_f}°</h3>
            <h3>{am ? time + " AM" : time + " PM"}</h3>
        </div>
        )   
    })
    } 
    if (props.selectedForecast.hour){
    return (
        <>
        <h2 className="defaultMargin">Forecasted Hours</h2>
        <div className="allHours">
            {hoursList}
        </div>
        </>
    )
    }
}

export default ForecastHourlyInfo