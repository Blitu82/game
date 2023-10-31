const image = document.getElementById('img');

image.addEventListener('click', event => {
  // the (0,0) point is top-left corner of the image

  const x = event.offsetX;
  const y = event.offsetY;

  const imageWidth = image.width;
  const imageHeight = image.height;

  const scaledX = (x / imageWidth) * image.naturalWidth;
  const scaledY = (y / imageHeight) * image.naturalHeight;

  console.log(`x: ${scaledX} and y: ${scaledY}`);
});
