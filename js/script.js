import Slide from './slide.js';
import debounce from './debounce.js';


const slide = new Slide('.slide', '.slide-wrapper');
slide.init();

slide.changeSlide(3);
slide.activePrevSlide();