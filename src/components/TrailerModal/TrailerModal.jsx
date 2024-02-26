import React, { useEffect } from 'react';
import scss from './TrailerModal.module.scss';

export const TrailerModal = ({ trailerKey, onClose }) => {
  const YouTube_URL = 'https://www.youtube-nocookie.com/embed/';

  // Esc close modal
  useEffect(() => {
    const handleEscapeKey = e => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  //  On \ Off scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={scss.modalBackdrop} onClick={onClose}>
      <div className={scss.modalContent} onClick={e => e.stopPropagation()}>
        <button className={scss.closeButton} onClick={onClose}>
          X
        </button>
        {trailerKey && (
          <iframe
            className={scss.iframe}
            width="560"
            height="315"
            src={`${YouTube_URL}${trailerKey}`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
