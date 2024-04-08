
function CityInformation(props) {
    return (
        <>
            <div className="makeFlex">
                <div>
                    <h2>
                        {props.cityData.location.country === 'United States of America' ? props.cityData.location.name + ', ' + props.cityData.location.region : props.cityData.location.name + ', ' + props.cityData.location.country}
                    </h2>
                    <div className="quickInfo">
                        <h2 style={{ marginLeft: "10px" }}>Current Weather</h2>
                        <div className="makeFlex">
                            <img src={props.cityData.current.condition.icon} alt="" style={{ height: '100px' }} />
                            <h1 style={{ fontSize: '50px', marginTop: '20px' }}>{props.cityData.current.temp_f}°</h1>
                            <div style={{ marginLeft: '25px', marginRight: '25px' }}>
                                <p>{props.cityData.current.condition.text}</p>
                                <p style={{ fontSize: '80%' }}>Feels like {props.cityData.current.feelslike_f}°</p>
                            </div>
                        </div>
                        <div className="makeFlex">
                            <div className="defaultMargin">
                                <p>Wind</p>
                                <h4>{props.cityData.current.wind_mph} mph</h4>
                            </div>
                            <div className="defaultMargin">
                                <p>Humidity</p>
                                <h4>{props.cityData.current.humidity}%</h4>
                            </div>
                            <div className="defaultMargin">
                                <p>Pressure</p>
                                <h4>{props.cityData.current.pressure_in} in</h4>
                            </div>
                            <div className="defaultMargin">
                                <p>Precipitation</p>
                                <h4>{props.cityData.current.precip_in} in</h4>
                            </div>
                            <div className="defaultMargin">
                                <p>Cloud Cover</p>
                                <h4>~{props.cityData.current.cloud}%</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CityInformation