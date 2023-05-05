import { useEffect, useState } from 'react';

export function useSlidesPerView() {
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    function handleMediaQuery() {
      if (!window.matchMedia('(min-width: 35em)').matches) {
        setSlidesPerView(1);
      }
      if (window.matchMedia('(min-width: 35em)').matches) {
        setSlidesPerView(2);
      }
      if (window.matchMedia('(min-width: 45em)').matches) {
        setSlidesPerView(3);
      }
      if (window.matchMedia('(min-width: 50em)').matches) {
        setSlidesPerView(4);
      }
      if (window.matchMedia('(min-width: 60em)').matches) {
        setSlidesPerView(5);
      }
    }

    window.addEventListener('resize', handleMediaQuery);

    handleMediaQuery();

    return () => {
      window.removeEventListener('resize', handleMediaQuery);
    };
  }, []);

  return { slidesPerView };
}
