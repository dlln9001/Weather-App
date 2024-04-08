import '../App.css'



function CityPreview(props) {

    return (
        <div className='cityAll'>
            <div className='containCities'>
                {props.citiesHtml}
            </div>
        </div>
    )
}

export default CityPreview