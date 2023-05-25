import { KeenSliderOptions } from 'keen-slider/react';

export const keenSliderOptions: KeenSliderOptions = {
  slides: { perView: 1 },
  breakpoints: {
    '(min-width: 35em)': {
      slides: { perView: 2, spacing: 5 },
    },
    '(min-width: 45em)': {
      slides: { perView: 3, spacing: 5 },
    },
    '(min-width: 50em)': {
      slides: { perView: 4, spacing: 5 },
    },
    '(min-width: 60em)': {
      slides: { perView: 5, spacing: 10 },
    },
  },
};
