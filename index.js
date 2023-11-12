// Array with the scaledX and scaledY coordinates

const capitals = [
  { name: 'Lisbon', coordinates: [107, 737], continent: 'Europe' },
  { name: 'Madrid', coordinates: [230, 686], continent: 'Europe' },
  { name: 'Paris', coordinates: [369, 415], continent: 'Europe' },
  { name: 'London', coordinates: [312, 322], continent: 'Europe' },
  { name: 'Dublin', coordinates: [172, 252], continent: 'Europe' },
  { name: 'Berlin', coordinates: [619, 284], continent: 'Europe' },
  { name: 'Wien', coordinates: [687, 438], continent: 'Europe' },
  { name: 'Prague', coordinates: [643, 371], continent: 'Europe' },
  { name: 'Rome', coordinates: [599, 642], continent: 'Europe' },
  { name: 'Warsaw', coordinates: [793, 295], continent: 'Europe' },
  { name: 'Zagreb', coordinates: [678, 518], continent: 'Europe' },
  { name: 'Belgrad', coordinates: [780, 550], continent: 'Europe' },
  { name: 'Athens', coordinates: [855, 758], continent: 'Europe' },
  { name: 'Ankara', coordinates: [1062, 701], continent: 'Europe' },
  { name: 'Kyiv', coordinates: [1009, 359], continent: 'Europe' },
  { name: 'Minsk', coordinates: [943, 231], continent: 'Europe' },
  { name: 'Vilnius', coordinates: [889, 201], continent: 'Europe' },
  { name: 'Moscow', coordinates: [1172, 158], continent: 'Europe' },
  { name: 'Copenhagen', coordinates: [601, 161], continent: 'Europe' },
  { name: 'Amsterdam', coordinates: [428, 290], continent: 'Europe' },
  { name: 'Sofia', coordinates: [845, 616], continent: 'Europe' },
  { name: 'Bucarest', coordinates: [908, 562], continent: 'Europe' },
  { name: 'Baku', coordinates: [1448, 688], continent: 'Europe' },
  { name: 'Yerevan', coordinates: [1327, 694], continent: 'Europe' },
  { name: 'Tbilsi', coordinates: [1335, 648], continent: 'Europe' },
  { name: 'Andorra-La-Vella', coordinates: [349, 623], continent: 'Europe' },
  { name: 'Tokyo', coordinates: [1589, 287], continent: 'Asia' },
  { name: 'Beijing', coordinates: [1189, 195], continent: 'Asia' },
  { name: 'Ha Noi', coordinates: [1010, 572], continent: 'Asia' },
  { name: 'Islamabad', coordinates: [448, 329], continent: 'Asia' },
  { name: 'Tehran', coordinates: [79, 287], continent: 'Asia' },
  { name: 'Bangkok', coordinates: [924, 702], continent: 'Asia' },
  { name: 'New Dehli', coordinates: [518, 428], continent: 'Asia' },
  { name: 'Kathmandu', coordinates: [658, 448], continent: 'Asia' },
  { name: 'Hong Kong', coordinates: [1150, 545], continent: 'Asia' },
  { name: 'Taipei', coordinates: [1274, 499], continent: 'Asia' },
  { name: 'Seul', coordinates: [1371, 242], continent: 'Asia' },
];

const geoGame = new GeoGame(capitals);

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const europeButton = document.getElementById('europe-button');
const asiaButton = document.getElementById('asia-button');
const startScreen = document.getElementById('game-intro');
const inputOfCities = document.getElementById('dropdown-cities');

startButton.addEventListener('click', () => {
  geoGame.start();
});

inputOfCities.addEventListener('change', function () {
  geoGame.numberOfCapitals = parseInt(inputOfCities.value);
  console.log(geoGame.numberOfCapitals);
});

europeButton.addEventListener('click', () => {
  const filteredCapitals = geoGame.filterCapitals('Europe');

  geoGame.next();

  geoGame.map.setAttribute('src', 'img/europe.png');

  geoGame.citiesToClick.innerHTML = geoGame.numberOfCapitals;

  const pickedCities = geoGame.shuffleCapitals(filteredCapitals);

  geoGame.displayCity(pickedCities);

  restartButton.addEventListener('click', () => {
    location.reload();
  });
});

asiaButton.addEventListener('click', () => {
  geoGame.filterCapitals('Asia');
  const filteredCapitals = geoGame.filterCapitals('Asia');

  geoGame.next();

  geoGame.map.setAttribute('src', 'img/asia.png');

  geoGame.citiesToClick.innerHTML = geoGame.numberOfCapitals;

  const pickedCities = geoGame.shuffleCapitals(filteredCapitals);

  geoGame.displayCity(pickedCities);

  restartButton.addEventListener('click', () => {
    location.reload();
  });
});
