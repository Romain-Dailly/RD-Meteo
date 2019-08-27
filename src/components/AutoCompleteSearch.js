import React, { useState } from 'react';
import { Select } from 'antd';
import apiKey from '../Utils/apikey.js';
import axios from 'axios';

const { Option } = Select;

const AutoCompleteSearch = ({location}) => {

  const [allFetchData, setAllFetchData]=useState([])

  const onSearch = value => {
    value !== 'location' &&
    axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${value}&language=fr-fr`)
    .then(response => {
      setAllFetchData([...new Set(response.data)].map((da, key) => Object.assign({ key:da.Key, city:da.LocalizedName, country:da.Country.LocalizedName, index:key})));
    });
  };

  const onSelect = (value, data) => {
    value !== 'location' ?
    location(allFetchData[data.key]):
    location('stockedLocation');
  };

  return (
    <Select
      style={{ width: 300 }}
      showSearch
      placeholder='Tapez un nom de ville'
      optionFilterProp="children"
      onSelect={onSelect}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
  >
      <Option value='location'>Ma position</Option>
        {
          allFetchData.map((data, index) => 
          <Option value={data.city} key={index}>{data.city}
          </Option>
          )
        }

    </Select>
  );
};

export default AutoCompleteSearch;