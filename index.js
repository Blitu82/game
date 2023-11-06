// Array with the scaledX and scaledY coordinates
const capitals = [
  { name: 'Lisbon', coordinates: [39.620060790273556, 615.2669270833334] },
  { name: 'Madrid', coordinates: [534.870820668693, 414.1796875] },
  { name: 'Porto', coordinates: [100, 100] },
  { name: 'Barcelona', coordinates: [700, 100] },
  { name: 'Tenerife', coordinates: [650, 400] },
];

const geoGame = new GeoGame(capitals);

const startButton = document.getElementById('start-button');
const nexButton = document.getElementById('next-button');

startButton.addEventListener('click', () => {
  geoGame.start();
});

nexButton.addEventListener('click', () => {
  geoGame.next();
});

const pickedCities = geoGame.shuffleCapitals();

geoGame.displayCity(pickedCities);
