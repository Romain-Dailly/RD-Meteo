import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

const Weather = ({ data }) => {

	let windDirection = (dat) => {
		if (dat==='NE'){
				return'Nord-Est';
			} else if (dat==='NO'){
				return 'Nord-Ouest';
			} else if (dat==='SO'){
				return 'Sud-Ouest';
			} else if (dat==='SE'){
				return 'Sud-Est';
			} else if (dat==='N'){
				return 'Nord';
			} else if (dat==='S'){
				return 'Sud';
			} else if (dat==='E'){
				return 'Est';
			} else if (dat==='O'){
				return 'Ouest';
			} else if (dat==='ENE'){
				return 'Nord-Est';	
			} else if (dat==='ONO' || 'WNW'){
			        return 'Nord-Ouest';
			} else if (dat==='OSO' || 'WSW'){
			        return 'Sud-Ouest';
			} else if (dat==='ESE'){
			        return 'Sud-Est';
			} else if (dat==='NNE'){
			        return 'Nord-Est';
			} else if (dat==='NNO' || 'NNW'){
			        return 'Nord-Ouest';
			} else if (dat==='SSE'){
			        return 'Sud-Est';
			} else if (dat==='SSO' || 'SSW'){
			        return 'Sud-Ouest';
			};
	};
	
  let linkImage = 
  `https://vortex.accuweather.com/adc2010/images/slate/icons/${data.Day.Icon}.svg`;
  let temp =
  `min : ${data.Temperature.Minimum.Value}°c,  
  max : ${data.Temperature.Maximum.Value}°c`;		
  let wind=
  `${Math.round(data.Day.Wind.Speed.Value)}km/h, ${windDirection(data.Day.Wind.Direction.Localized)}`;
	let moonIcon=`http://icons.wunderground.com/graphics/moonpictsnew/moon${data.Moon.Age}.gif`
	return (
			<div className="day col-sm-8 col-md-4 col-lg-3 offset-sm-2 offset-md-0">
				<div className="card d-flex justify-content-center">
					<div className="card-header d-flex justify-content-center">
						<h5 className="card-title ">{moment(data.Date).format("dddd Do MMMM")}</h5>
					</div>
						<img className="moon d-flex justify-content-center" src={moonIcon} alt='moon' style={data.Moon.Age=15?{'margin':'auto','opacity':'1'}:{'margin':'auto'}}/>
					<img src={linkImage} className="card-img-top p-2" alt="logo"/>
					<div className="card-body">
						<h6 className="card-text d-flex justify-content-center ">Températures</h6>
						<h6 className="card-text d-flex justify-content-center ">{temp}</h6>
						<h6 className="card-text d-flex justify-content-center ">Vent</h6>
						<h6 className="card-text d-flex justify-content-center">{wind}</h6>
					</div>
				</div>
			</div>
	);
};

export default Weather;