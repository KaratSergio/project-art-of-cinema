import React from 'react';
import scss from './RatingBar.module.scss';

export const RatingBar = ({ rating }) => {
  const maxRating = 10;
  const circleRadius = 20;
  const circumference = 2 * Math.PI * circleRadius;
  const offset = circumference - (rating / maxRating) * circumference;

  return (
    <div className={scss.ratingBar}>
      <svg className={scss.ratingCircle}>
        <circle
          className={scss.ratingCircle__background}
          cx="24"
          cy="24"
          r={circleRadius}
        ></circle>
        <circle
          className={scss.ratingCircle__fill}
          cx="24"
          cy="24"
          r={circleRadius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        ></circle>
      </svg>
      <div className={scss.ratingText}>{rating}</div>
      <div>
        <p className={scss.accentText}>
          user <br /> score
        </p>
      </div>
    </div>
  );
};

export default RatingBar;
