import React, { useState, useEffect } from 'react';
import { ToSmallButton } from '../Buttons';
import { useParams } from 'react-router-dom';
import CityMapping from './city_mapping';
import axios from 'axios';

const LocationTitle = () => {
  const { cityId } = useParams();
  const cityName = CityMapping[cityId] || 'Unknown City';

  return (
    <h1 className="text-2xl font-bold mb-4">
      {cityName}
    </h1>
  );
};

function BlogHeader({ locationName }) {
  const { cityId, img } = useParams();
  const [ weather, setWeather ] = useState(null);
  const cityName = CityMapping[cityId];

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_TEST_URL}/weather/${cityName}`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data;
        setWeather(data);
        console.log(cityName);
        console.log(data);
      })
      .catch(error => console.error('날씨 데이터 에러: ', error));
  }, [cityName]);


  return (
    <div className="relative">
      <img src={`/cities/${cityId}/${img}`} alt="region_img" className="w-full h-70" />
      <div className="absolute top-0 left-10 w-[300px] h-[150px] bg-gray-100 opacity-70 rounded-b-lg flex items-center">
        <div className="flex flex-row items-center justify-center w-full">
          <div className="mr-2">
            <LocationTitle currentLocation={locationName} />
          </div>
          {weather && (
            <div>
              {weather.rainProbability < 50 ? (
                <img src="/sun.png" alt="sun" width="25" height="25" />
              ) : (
                <img src="/rain.png" alt="rain" width="25" height="25" />
              )}
              <p>{weather.minTemp}/{weather.maxTemp}</p>
              <p>{weather.rainProbability}%</p>
            </div>
          )}
        </div>
      </div>
      <section className="flex gap-[10px] absolute top-0 right-0 mt-4 mr-10">
          <ToSmallButton linkName='mainpage' Size='sm' iconName='mainpage' colorName='orange' title='mainpage'/>
          <ToSmallButton linkName='mypage' Size='sm' iconName='mypage' colorName='purple' title='mypage'/>
      </section>
    </div>
  );
}

export default BlogHeader;
