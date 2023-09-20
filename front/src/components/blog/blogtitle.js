import React, { useState, useEffect } from 'react';
import { ToSmallButton } from '../Buttons';
import { useParams } from 'react-router-dom';
import CityMapping from './city_mapping';
import axios from 'axios';

const LocationTitle = () => {
  const { cityId } = useParams();
  const cityInfo = CityMapping[cityId];
  const cityName = cityInfo ? cityInfo.name : 'Unknown City';

  return (
    <h1 className="text-2xl font-bold mb-4">
      {cityName}
    </h1>
  );
};

function BlogHeader({ locationName }) {
  const { cityId } = useParams();
  const [ weather, setWeather ] = useState(null);
  const cityInfo = CityMapping[cityId];
  const cityName = cityInfo ? cityInfo.name : 'Unknown City';
  const cityImage = cityInfo ? cityInfo.image : '';

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/weather/${cityName}`;

    axios.get(apiUrl, {
      headers: {
        'ngrok-skip-browser-warning': '69420',
      }
    })
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
      <img src={`${cityImage}`} alt="region_img" className="w-full h-70" />
      <div className="absolute top-0 left-10 w-[300px] h-[150px] bg-gray-100 opacity-70 rounded-b-lg flex items-center">
        <div className="flex flex-row items-center justify-center w-full">
          <div className="mr-8">
            <LocationTitle currentLocation={locationName} />
          </div>
          {weather && (
            <div className='flex flex-col justify-center items-center ml-[-10px] gap-[4px] '>
              {weather.rainProbability < 50 ? (
                <img src="/sun.png" alt="sun" width="30" height="30" />
              ) : (
                <img src="/rain.png" alt="rain" width="30" height="30" />
              )}
              <p className='font-semibold'>{weather.minTemp} / {weather.maxTemp} ℃</p>
              <p className='font-semibold ml-[-10px]'>💧 {weather.rainProbability} %</p>
            </div>
          )}
        </div>
      </div>
      <section className="flex gap-[10px] absolute top-0 right-0 mt-4 mr-10">
          <ToSmallButton linkName='mainpage' Size='sm' iconName='mainpage' colorName='orange' title='mainpage'/>
          <ToSmallButton linkName='mypage' Size='sm' iconName='mypage' colorName='green' title='mypage'/>
      </section>
    </div>
  );
}

export default BlogHeader;
