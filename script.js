const frameCount = 51; //amount of frames I got from the cycling video
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
  canvas.height = window.innerWidth*9/16   ; // Maintain 16:9 aspect ratio
}

function render() {
  const img = images[imageIndex];
  if (img && img.complete) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate the aspect ratio of the image
    const imgAspectRatio = img.width / img.height;
    const canvasAspectRatio = canvas.width / canvas.height;
    
    let sourceX, sourceY, sourceWidth, sourceHeight;
    let destX = 0, destY = 0, destWidth = canvas.width, destHeight = canvas.height;
    
    if (imgAspectRatio > canvasAspectRatio) {
      // Image is wider than canvas - crop sides
      sourceHeight = img.height;
      sourceWidth = sourceHeight * canvasAspectRatio;
      sourceX = (img.width - sourceWidth) / 2;
      sourceY = 0;
    } else {
      sourceWidth = img.width;
      sourceHeight = sourceWidth / canvasAspectRatio;
      sourceX = 0;
      sourceY =  120; 
    }

    context.drawImage(
      img,
      sourceX, sourceY, sourceWidth, sourceHeight,  
      destX, destY, destWidth, destHeight           
    );
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

//Footer current year generator
const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;
