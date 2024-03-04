import React from 'react';
import scss from './RatingBar.module.scss';

export const RatingBar = ({ rating }) => {
  console.log(rating);
  const maxRating = 10;
  const barWidth = (rating / maxRating) * 100;

  return (
    <div className={scss.ratingBar}>
      <div className={scss.ratingFill} style={{ width: `${barWidth}%` }}>
        {rating} / 10
      </div>
    </div>
  );
};

export default RatingBar;
