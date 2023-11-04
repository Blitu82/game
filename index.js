// Array with the scaledX and scaledY coordinates
const capitals = [
  { name: 'Lisbon', coordinates: [39.620060790273556, 615.2669270833334] },
  { name: 'Madrid', coordinates: [534.870820668693, 414.1796875] },
  { name: 'Porto', coordinates: [100, 100] },
  { name: 'Barcelona', coordinates: [700, 100] },
  { name: 'Tenerife', coordinates: [650, 400] },
];

let cityIndex = 0;

const geoGame = new GeoGame(capitals);

const pickedCities = geoGame.shuffleCapitals();

const map = document.getElementById('map'); //we can later access the continent image depending on the city

function displayCity() {
  console.log(`Where is ${pickedCities[cityIndex].name}?`);

  map.addEventListener('click', waitingForClick);

  function waitingForClick(event) {
    // the (0,0) point is top-left corner of the image

    const x = event.offsetX;
    const y = event.offsetY;

    const mapWidth = map.width;
    const mapHeight = map.height;

    const scaledX = (x / mapWidth) * map.naturalWidth;
    const scaledY = (y / mapHeight) * map.naturalHeight;

    const userClick = [scaledX, scaledY];

    const distance = geoGame.calculateDist(pickedCities[0], userClick);

    console.log(
      `The distance to ${pickedCities[cityIndex].name} is ${distance}`
    );

    console.log(`x: ${scaledX} and y: ${scaledY}`);

    geoGame.scoreUpdate(distance);

    console.log(`This is the score: ${geoGame.score}`);
    console.log(
      `This is the number of Capitals Clicked: ${geoGame.capitalsClicked}`
    );

    //pickedCities.shift();
    cityIndex++;
    console.log(pickedCities);
    if (geoGame.checkIfFinished()) {
      return console.log('Game Over');
    }
    map.removeEventListener('click', waitingForClick);
    setTimeout(displayCity, 3000);
  }
}

displayCity();
