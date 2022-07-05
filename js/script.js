import SlideNav from './slide.js';
import debounce from './debounce.js';

const slide = new SlideNav('.slide', '.slide-wrapper');
slide.init();
slide.addArrow('.prev', '.next');
slide.addControl('.custom-controls');
