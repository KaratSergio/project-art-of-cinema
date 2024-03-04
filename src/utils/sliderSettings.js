const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '4px',
        speed: 500,
        rows: 2,
        slidesPerRow: 1,
        arrows: false,
      },
    },
  ],
};

export default sliderSettings;
