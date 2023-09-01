import React from 'react';

const Tag = ({ tagName, onClick, isSelected }) => {
  return (
    <div
      className={`Tag ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {tagName}
    </div>
  );
};

export default Tag;
