import scss from './TrailerModal.module.scss';

export const TrailerModal = ({ trailerKey, onClose }) => {
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
            src={`https://www.youtube.com/embed/${trailerKey}`}
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
