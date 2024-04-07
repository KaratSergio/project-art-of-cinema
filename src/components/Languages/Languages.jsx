import React from 'react';

import { useSelector } from 'react-redux';

import { selectLanguages } from '../../redux/dataMovie/selectors';

const Language = () => {
  const localization = useSelector(selectLanguages);

  return (
    <div>
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
