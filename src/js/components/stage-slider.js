import Flickity from 'flickity-as-nav-for';
import 'flickity/dist/flickity.min.css';

const StageSlider = () => {
  const sliders = document.querySelectorAll('.js-stage-slider');
  const initSlider = (slider) => {
    const contentList = slider.querySelector('.stage-slider__content');
    const slides = contentList.querySelectorAll('.stage-slider__slide');
    const navbarList = createTabsContainer();
    slider.insertBefore(navbarList, contentList);

    const addTabToContainer = (slide) => {
      if (!slide) return;
      slide.classList.add('stage-slider__slide_init');
      const preTitle = slide.getAttribute('data-pre-title');
      const preImg = slide.getAttribute('data-pre-img');
      const tab = createTab({
        preTitle,
        preImg,
      });
      navbarList.appendChild(tab);
    };

    addTabToContainer(slides[0]);

    window.addEventListener('load', () => {
      navbarList.innerHTML = '';
      navbarList.removeAttribute('style');
      slides.forEach((slide) => addTabToContainer(slide));
      initFlickity(contentList, slides);
      initFlickityNav(navbarList, contentList);
    });
  };

  const initFlickity = (sliderContainer, slides) => new Flickity(sliderContainer, {
    cellAlign: 'left',
    draggable: true,
    prevNextButtons: true,
    adaptiveHeight: false,
    pageDots: false,
    initialIndex: 2,
    on: {
      ready: () => {
        slides.forEach((slide) => {
          slide.classList.add('stage-slider__slide_full');
        });
      },
    },
  });

  const initFlickityNav = (sliderContainer, navForContainer) => new Flickity(sliderContainer, {
    asNavFor: navForContainer,
    contain: true,
    pageDots: false,
    prevNextButtons: true,
  });

  const createTabsContainer = () => {
    const tabsContainer = document.createElement('ul');
    tabsContainer.classList.add('stage-slider__navbar');
    tabsContainer.style.width = 'auto';
    return tabsContainer;
  };

  const createTab = ({
    preTitle,
    preImg = '',
  }) => {
    const tab = document.createElement('li');
    tab.classList.add('stage-slider__nav-card');
    const html = `<h3 class="stage-slider__nav-card-txt text text_weight_bold">${preTitle}</h3><img class="stage-slider__nav-card-img" src="${preImg}" alt="${preTitle}">`;
    tab.insertAdjacentHTML('beforeend', html);
    return tab;
  };

  sliders.forEach((slider) => {
    initSlider(slider);
  });
};

export default StageSlider;
