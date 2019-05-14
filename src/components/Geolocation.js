import React, { Component } from 'react';
import Weather from './Weather';

class Geolocation extends Component {
  constructor() {
    super();
    this.state = {
      key:'aZ7V4vIvgc3jRTYp4SnSzrOP7NA2z6pd',
      long: '',
      lat: '..',
      city: '',
      country: '',
      locationKey: null,
      weather: []
    };
  }

  componentDidMount=()=> {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ lat: Math.round(position.coords.latitude * 100) / 100, long: Math.round(position.coords.longitude * 100) / 100 })
      fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.state.key}&q=${this.state.lat}%2C${this.state.long}&language=fr&details=true&toplevel=true`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          city: data.LocalizedName,
          locationKey: data.Key,
          country: data.Country.LocalizedName
        });
        fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.locationKey}?apikey=${this.state.key}&language=fr&details=true&metric=true&details=true`)
        .then(resp => resp.json())
        .then(dat => {
          this.setState({ weather: dat.DailyForecasts })
        });
      })
    });
  }

  render() {
    return (
      <div>
        <h1 class="d-flex justify-content-center mt-5">{this.state.city ? `${this.state.city}, ${this.state.country}` : null}</h1>
        <h2 class="d-flex justify-content-center">Météo sur 5 jours</h2>
        <div className="card-deck">
          {this.state.weather ? this.state.weather.map((day, i) =>
            <Weather key={i} data={day} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Geolocation;
