const frameCount = 51;
const canvas = document.getElementById('animationCanvas');
const context = canvas.getContext('2d');

function currentFrame (index){
  return `frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
}

const images = [];
let imageIndex = 0;

function preloadImages() {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }
}

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth* 9 / 16; // Maintain 16:9 aspect ratio
}

function render() {
  const img = images[imageIndex];
  if (img && img.complete) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
}

function onScroll() {
  const scrollTop = window.scrollY;
  const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;

  // Avoid divide-by-zero error
  const scrollFraction = maxScrollTop > 0
    ? scrollTop / maxScrollTop
    : 0;

  // Clamp strictly between 0 and 1
  const clampedFraction = Math.min(Math.max(scrollFraction, 0), 1);

  imageIndex = Math.floor(clampedFraction * (frameCount - 1));
  requestAnimationFrame(render);
}

window.addEventListener('scroll', onScroll);
window.addEventListener('resize', () => {
  setCanvasSize();
  render();
});

setCanvasSize();
preloadImages();
images[0].onload = render;




const currentYear = new Date().getFullYear();
            // Insert the current year into the footer
document.getElementById('current-year').textContent = currentYear;
