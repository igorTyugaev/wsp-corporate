/* import style */
import './index.scss';
/* import common js */
import '../../js/common';
/* import components and lib */
import PromoTabs from '../../js/components/promo-tabs';
import StepsSlider from '../../js/components/steps-slider';
import Header from '../../js/components/header';
import Quiz from '../../js/components/quiz';

/* Your JS Code goes here */
window.addEventListener('DOMContentLoaded', () => {
  PromoTabs();
  StepsSlider();
  Header();
  Quiz();
});
