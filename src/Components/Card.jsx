// Updated Card.js
import React from 'react';
import { useTheme } from '../Context/ThemeContext';

const Card = ({ Imgsrc, AltImg, Title, Desc, className = '', imgClassName = '',textClassname='' }) => {
  const { colors } = useTheme();
  
  return (
    <div className={`p-0 rounded-lg shadow-lg flex flex-col justify-start items-center overflow-hidden ${className}`} style={{ color: colors.text }}>
      <div className="w-full h-[150px] flex items-center justify-center bg-transparent rounded-t-lg rounded-b-lg">
        <img
          src={Imgsrc}
          alt={AltImg}
          className={` rounded-t-lg  ${imgClassName}`}
        />
      </div>
      <div className={`p-3 flex flex-col justify-between h-full ${textClassname}`}>
        <h2 className="text-center text-lg font-bold text-orange-300 mb-2">{Title}</h2>
        {Desc && <p className="text-center text-sm">{Desc}</p>}
      </div>
    </div>
  );
};

export default Card;
