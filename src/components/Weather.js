import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

class Weather extends Component {

	windDirection = (dat) => {
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
			}
	};
	
	render() {
		let linkImage = 
		`https://vortex.accuweather.com/adc2010/images/slate/icons/${this.props.data.Day.Icon}.svg`;
		let temp =
		`min : ${this.props.data.Temperature.Minimum.Value}°c,  
		max : ${this.props.data.Temperature.Maximum.Value}°c`;		
		let wind=
		`${Math.round(this.props.data.Day.Wind.Speed.Value)}km/h, ${this.windDirection(this.props.data.Day.Wind.Direction.Localized)}`;
		return (
			<div className="day">
				<div class="card">
					<div class="card-header d-flex justify-content-center">
						<h5 class="card-title ">{moment(this.props.data.Date).format("dddd Do MMMM")}</h5>
					</div>
					<img src={linkImage} class="card-img-top p-2" alt="logo" />
					<div class="card-body">
						<h6 class="card-text d-flex justify-content-center ">Températures</h6>
						<h6 class="card-text d-flex justify-content-center ">{temp}</h6>
						<h6 class="card-text d-flex justify-content-center ">Vent</h6>
						<h6 class="card-text d-flex justify-content-center">{wind}</h6>
					</div>
				</div>
			</div>
		)
	}
}

export default Weather;
