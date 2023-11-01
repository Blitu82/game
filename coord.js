// Array with the scaledX and scaledY coordinates
const capitals = [
  { name: 'Lisbon', coordinates: [39.620060790273556, 615.2669270833334] },
  { name: 'Madrid', coordinates: [534.870820668693, 414.1796875] },
];

// define a maximum distance in pixels
const maxDist = 10;

// pick a random city from the capitals array
const randomCapital = capitals[Math.floor(Math.random() * capitals.length)];
console.log(`The random capital is ${randomCapital.name}`);

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

  // calculate distance between user click and randomCapital
  const deltaX = scaledX - randomCapital.coordinates[0];
  const deltaY = scaledY - randomCapital.coordinates[1];
  const dist = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  console.log(`The distance to ${randomCapital.name} is ${dist}`);
  if (dist > maxDist) {
    console.log(`Try again!`);
  } else {
    console.log(`Success! You have selected  ${randomCapital.name}`);
  }
});

/* function guessCapital(randomCapital, scaledX, scaledY, maxDist){
  
  if(){
    return 
  } */

// }
