export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }

  moveSlide(distX) {
    // salvando uma referencia do valor do eixo x ao mover, para que nao volte a 0
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clienteX) {
    // agora pega o eixo x definido abaixo e atualiza o movement do objeto dist
    this.dist.movement = (this.dist.startX - clienteX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    let movetype;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = 'mousemove';
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = 'touchmove';
    }
    // define o eixo x como sendo igual ao eixo x do evento ao clicar
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    const pointerPosition =
      event.type === 'mousemove'
        ? event.clienteX
        : event.changedTouches[0].clienteX;
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  addSlideEvents() {
    // ativa função onStart com o clique fica segurado
    this.wrapper.addEventListener('mousedown', this.onStart);
    // evento touch p celular
    this.wrapper.addEventListener('touchstart', this.onStart);
    // ativa função onEnd quando solta o clique do mouse
    this.wrapper.addEventListener('mouseup', this.onEnd);
    // evento touch p celular
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // slides config

  slidePosition(slide) {
    // pegando o total de width da img do slide, tirando a sobra das margins e dividindo por 2
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    // tirando esse resultado da margin menos quanto falta para left, numero tem que ser negativo, feito isso vamos deixar a imagem centralizada
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    // retornando um map pois é possivel personaliza-lo com um objeto
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return {
        position,
        element,
      };
    });
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}
