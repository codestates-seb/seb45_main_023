import React from 'react';
import { GreenButton, PurpleButton } from '../Buttons';

const Tag = ({ tagName, onClick, isSelected }) => {
  return (
    <button
      className={`Tag ${ isSelected ? PurpleButton : GreenButton } w-[100px] h-[50px] text-[10px] mr-2`}
      onClick={onClick}
    >
      {tagName}
    </button>
  );
};

export default Tag;
