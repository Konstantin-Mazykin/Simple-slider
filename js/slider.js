const sliderItems = document.querySelectorAll(".slider .slider-line .card");
const sliderLine = document.querySelector(".slider-line");
const buttonNext = document.querySelector(".button-next");
const buttonPrev = document.querySelector(".button-prev");

let count = 0;
let positionX = null;

let width;
let sliderWindowWidth;
let quantityOfSlides;

sliderLine.style.transition = "all ease 0.5s";
buttonPrev.style.visibility = "hidden";

function init() {
  width = document.querySelector(".card").offsetWidth;
  sliderWindowWidth = document.querySelector(".slider").offsetWidth;
  quantityOfSlides = Math.round(sliderWindowWidth / width);
  rollSlidder();
}

function rollSlidder() {
  sliderLine.style.transform = `translate(${-count * width}px)`;
}

function rollSlidderNext() {
  if (count == sliderItems.length - quantityOfSlides) return;
  count++;
  rollSlidder();
  if (count == sliderItems.length - quantityOfSlides) {
    buttonNext.style.visibility = "hidden";
    return;
  }
  buttonPrev.style.visibility = "visible";
}

function rollSlidderPrev() {
  if (count == 0) return;
  count--;
  rollSlidder();
  if (count == 0) {
    buttonPrev.style.visibility = "hidden";
    return;
  }
  buttonNext.style.visibility = "visible";
}

function handleTouchStart(event) {
  positionX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  if (!positionX) return;
  let offset = event.touches[0].clientX;
  if (Math.abs(positionX - offset) < 50) return;

  if (offset < positionX) {
    rollSlidderNext();
  } else {
    rollSlidderPrev();
  }
  positionX = null;
}

init();

window.addEventListener("resize", init);

buttonNext.addEventListener("click", rollSlidderNext);
buttonPrev.addEventListener("click", rollSlidderPrev);

sliderLine.addEventListener("touchstart", handleTouchStart);
sliderLine.addEventListener("touchmove", handleTouchMove);
