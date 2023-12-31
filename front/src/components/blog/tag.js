import React from 'react';
import { GreenButton, PurpleButton, BlueButton, RedButton, tagSelected } from '../Buttons';

const Tag = ({ tagName, onClick, isSelected }) => {
  const tagColors = {
    '인기글': BlueButton,
    '음식': RedButton,
    '숙소': GreenButton,
    '교통': BlueButton,
    '쇼핑': PurpleButton,
    '관광지': GreenButton,
    '액티비티': RedButton,
  };

  return (
    <button
      className={`Tag w-[100px] h-[60px] text-[12px] mr-2 ${isSelected ? tagSelected : tagColors[tagName]}`}
      onClick={onClick}
    >
      {tagName}
    </button>
  );
};

export default Tag;


