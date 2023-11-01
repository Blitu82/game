// Array with the scaledX and scaledY coordinates
const capitals = [
  { name: 'Lisbon', coordinates: [39.620060790273556, 615.2669270833334] },
  { name: 'Madrid', coordinates: [534.870820668693, 414.1796875] },
  { name: 'Porto', coordinates: [534.870820668693, 414.1796875] },
  { name: 'Barcelona', coordinates: [534.870820668693, 414.1796875] },
  { name: 'Tenerife', coordinates: [534.870820668693, 414.1796875] },
];

const geoGame = new GeoGame(capitals);

const pickedCities = geoGame.shuffleCapitals();

const image = document.getElementById('img'); //we can later access the continent image depending on the city

pickedCities.forEach(city => {
  console.log(`Where is ${city.name}?`);
  image.addEventListener('click', event => {
    // the (0,0) point is top-left corner of the image

    const x = event.offsetX;
    const y = event.offsetY;

    const imageWidth = image.width;
    const imageHeight = image.height;

    const scaledX = (x / imageWidth) * image.naturalWidth;
    const scaledY = (y / imageHeight) * image.naturalHeight;

    const userClick = [scaledX, scaledY];

    const distance = geoGame.calculateDist(city, userClick);

    console.log(`The distance to ${city.name} is ${distance}`);

    console.log(`x: ${scaledX} and y: ${scaledY}`);

    geoGame.scoreUpdate(distance);

    console.log(`This is the score: ${geoGame.score}`);
    console.log(
      `This is the number of Capitals Clicked: ${geoGame.capitalsClicked}`
    );

    pickedCities.shift(city);
    console.log(pickedCities);
  });
});
