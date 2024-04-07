import React from 'react';

import { useSelector } from 'react-redux';

import { selectLanguages } from '../../redux/dataMovie/selectors';

import scss from './Languages.module.scss';

const Language = () => {
  const localization = useSelector(selectLanguages);

  if (!localization || localization.length === 0) {
    return <div>No languages available</div>;
  }

  console.log('Localization:', localization);

  return (
    <div className={scss.container}>
      <h2>Localization:</h2>
      <ul>
        {localization.map(language => (
          <li key={language.iso_639_1}>{language.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Language;
