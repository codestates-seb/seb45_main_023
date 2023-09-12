import React from 'react';
import data from '../../dummy/dummy';

const LocationTitle = () => {
  const datas = data[0];
  return (
    <h1 className="text-2xl font-bold mb-4">
      {datas.blog.info.city_id}
    </h1>
  );
};

function BlogHeader({ locationName }) {
  return (
    <div>
      <img src="/region/jeju.png" alt="jeju_img" className="w-full h-70" />
      <div className="absolute top-0 left-10 w-[300px] h-[150px] bg-gray-100 opacity-70 rounded-b-lg flex items-center">
        <div className="flex flex-row items-center justify-center w-full">
          <div className="mr-2">
            <LocationTitle currentLocation={locationName} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogHeader;

