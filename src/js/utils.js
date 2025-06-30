(() => {
  const viewport = document.querySelector('meta[name="viewport"]');
  const switchViewport = () => {
    const value = window.outerWidth > 360 ? 'width=device-width,initial-scale=1' : 'width=360';
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  };
  window.addEventListener('resize', switchViewport);
  switchViewport();
})();

/* global Splide */
const setSlider = () => {
  const splideOptions = {
    arrows: false,
    pagination: false,
    autoWidth: true,
    type: 'loop',
    drag: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    autoScroll: {
      speed: 0.4,
      pauseOnHover: false,
    },
  };
  const sliderIds = ['#slider1', '#slider2'];
  sliderIds.forEach((id) => {
    new Splide(id, splideOptions).mount(window.splide.Extensions);
  });
};

const setCTA = () => {
  if (window.matchMedia('(max-width: 767px)').matches) {
    const cta = document.querySelector('.l-sticky-cta');
    const top = document.querySelector('.l-top');

    if (!cta || !top) {
      return;
    }
    const topBottom = top.getBoundingClientRect().bottom + window.scrollY;

    if (window.scrollY >= topBottom) {
      cta.classList.add('l-sticky-cta--show');
    } else {
      cta.classList.remove('l-sticky-cta--show');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
      }
    });
  };
  const defaultObserverOptions = {
    threshold: 0.1,
  };
  const defaultObserver = new IntersectionObserver(observerCallback, defaultObserverOptions);
  const targetElements = document.querySelectorAll('.js-scrollin');
  targetElements.forEach((target) => {
    defaultObserver.observe(target);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  setSlider();
  setCTA();
});

window.addEventListener('load', () => {
  const loadElms = document.querySelectorAll('.js-load');
  loadElms.forEach((loadElm) => {
    loadElm.classList.add('js-load--loaded');
  });
});

window.addEventListener('scroll', () => {
  setCTA();
});
