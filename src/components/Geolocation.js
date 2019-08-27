import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import apiKey from '../Utils/apikey.js';
import AutoCompleteSearch from './AutoCompleteSearch';
import axios from 'axios';
import LoadingState from './LoadingState';


const Geolocation = () => {
  
  const [isLoading, setIsLoading]= useState(true);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('getLocation');
  const [geolocationData, setGeolocationData] = useState('');

  const getData = () => {
    if (selectedLocation === 'getLocation') {
      navigator.geolocation.getCurrentPosition(dat => {
        let lat = Math.round(dat.coords.latitude * 100) / 100;
        let long = Math.round(dat.coords.longitude * 100) / 100;
        axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${long}&language=fr&details=true&toplevel=true`)
        .then(res => {
          setCity(res.data.LocalizedName);
          setCountry(res.data.Country.LocalizedName);
          axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${res.data.Key}?apikey=${apiKey}&language=fr&details=true&metric=true&details=true`)
          .then(weatherData => {
            setWeather(weatherData.data.DailyForecasts);  
            setGeolocationData({
              city:res.data.LocalizedName, 
              country:res.data.Country.LocalizedName, 
              weatherData: weatherData.data.DailyForecasts
            });
          });
        });
      });
    } else if (selectedLocation === 'stockedLocation' && geolocationData !== '') {
      setCity(geolocationData.city);
      setCountry(geolocationData.country);
      setWeather([...geolocationData.weatherData]);
    } else if (selectedLocation !== 'geolocation' && selectedLocation !== 'stockedLocation') {
        axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${selectedLocation.key}?apikey=${apiKey}&language=fr&details=true&metric=true&details=true`)
          .then(res => {
            setCity(selectedLocation.city);
            setCountry(selectedLocation.country);
            setWeather(res.data.DailyForecasts);
          });
      };
  };

  useEffect(() => { 
    getData();
  }, [selectedLocation])

  useEffect(() => {
    weather !== []  &&
      setIsLoading(false)
  },[weather])

  const modifyLocation = location => {
    setSelectedLocation(location);
    setIsLoading(true);
  };

  if (isLoading) {
    return <LoadingState />;
  }
  return (
    <div className="mt-5">
      <h1
        className={
          city.length >= 19
            ? 'd-flex justify-content-center long-text'
            : 'd-flex justify-content-center'
        }
      >
        {city ? `${city},` : null}
      </h1>
      <h1 className="d-flex justify-content-center">
        {city ? `${country}` : null}
      </h1>
      <h2 className="d-flex justify-content-center">Météo sur 5 jours</h2>
      <div className="d-flex justify-content-center">
        <AutoCompleteSearch location={location => modifyLocation(location)} />
      </div>
      <div className="card-deck d-flex justify-content-center col-12">
        {weather
          ? weather.map((day, i) => <Weather key={i} data={day} />)
          : null}
      </div>
    </div>
  );
};

export default Geolocation;
