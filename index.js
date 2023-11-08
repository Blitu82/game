// Array with the scaledX and scaledY coordinates

const capitals = [
  { name: 'Lisbon', coordinates: [107, 737] },
  { name: 'Madrid', coordinates: [230, 686] },
  { name: 'Paris', coordinates: [369, 415] },
  { name: 'London', coordinates: [312, 322] },
  { name: 'Dublin', coordinates: [172, 252] },
  { name: 'Berlin', coordinates: [619, 284] },
  { name: 'Wien', coordinates: [687, 438] },
  { name: 'Prague', coordinates: [643, 371] },
  { name: 'Rome', coordinates: [599, 642] },
  { name: 'Warsaw', coordinates: [793, 295] },
  { name: 'Zagreb', coordinates: [678, 518] },
  { name: 'Belgrad', coordinates: [780, 550] },
  { name: 'Athens', coordinates: [855, 758] },
  { name: 'Ankara', coordinates: [1062, 701] },
  { name: 'Kyiv', coordinates: [1009, 359] },
  { name: 'Minsk', coordinates: [943, 231] },
  { name: 'Vilnius', coordinates: [889, 201] },
  { name: 'Moscow', coordinates: [1172, 158] },
  { name: 'Copenhagen', coordinates: [601, 161] },
  { name: 'Amsterdam', coordinates: [428, 290] },
  { name: 'Sofia', coordinates: [845, 616] },
  { name: 'Bucarest', coordinates: [908, 562] },
  { name: 'Baku', coordinates: [1448, 688] },
  { name: 'Yerevan', coordinates: [1327, 694] },
  { name: 'Tbilsi', coordinates: [1335, 648] },
  { name: 'Andorra-La-Vella', coordinates: [349, 623] },
];

const geoGame = new GeoGame(capitals);

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const nexButton = document.getElementById('next-button');

startButton.addEventListener('click', () => {
  geoGame.start();
});

nexButton.addEventListener('click', () => {
  geoGame.next();
});

const pickedCities = geoGame.shuffleCapitals();

geoGame.displayCity(pickedCities);

restartButton.addEventListener('click', () => {
  location.reload();
});
