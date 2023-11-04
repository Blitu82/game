class GeoGame {
  constructor(capitals) {
    this.startScreen = document.getElementById('game-intro');
    this.gameScreen = document.getElementById('game-container');
    this.gameEndScreen = document.getElementById('game-end');
    this.map = document.getElementById('map');
    this.cityGuess = document.getElementById('city-guess');
    this.scoreElement = document.getElementById('score');
    this.citiesClickedElement = document.getElementById('cities-clicked');

    this.capitals = capitals;
    this.cityIndex = 0;
    this.pickedCapitals = [];
    this.numberOfCapitals = 5;
    this.capitalsClicked = 0;
    this.score = 0;
    this.maxDist1 = 10;
    this.maxDist2 = 30;
  }

  start() {
    this.startScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';
  }

  shuffleCapitals() {
    if (this.capitals) {
      const copyArr = JSON.parse(JSON.stringify(this.capitals));
      copyArr.sort(() => Math.random() - 0.5);
      this.pickedCapitals = copyArr.slice(0, this.numberOfCapitals);
      return this.pickedCapitals;
    }
  }

  //   pickCity() {
  //     const pickedCity = this.pickedCapitals[0];
  //     this.pickedCapitals.shift();
  //     return pickedCity;
  //   }

  calculateDist(pickedCity, userClick) {
    const deltaX = userClick[0] - pickedCity.coordinates[0];
    const deltaY = userClick[1] - pickedCity.coordinates[1];
    const dist = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    return dist;
  }

  scoreUpdate(dist) {
    if (dist <= this.maxDist1) {
      this.score += 2;
    } else if (dist <= this.maxDist2 && dist > this.maxDist1) {
      this.score += 1;
    }
    this.capitalsClicked++;
  }

  checkIfFinished() {
    if (this.capitalsClicked === this.numberOfCapitals) {
      return true;
    } else {
      return false;
    }
  }

  displayCity(pickedCities) {
    this.cityGuess.innerHTML = `Where is ${pickedCities[this.cityIndex].name}?`;

    const waitingForClick = event => {
      const x = event.offsetX;
      const y = event.offsetY;
      const mapWidth = this.map.width;
      const mapHeight = this.map.height;
      const scaledX = (x / mapWidth) * this.map.naturalWidth;
      const scaledY = (y / mapHeight) * this.map.naturalHeight;
      const userClick = [scaledX, scaledY];
      const distance = this.calculateDist(
        pickedCities[this.cityIndex],
        userClick
      );
      console.log(
        `The distance to ${pickedCities[this.cityIndex].name} is ${distance}`
      );

      this.scoreUpdate(distance);

      //console.log(`This is the score: ${this.score}`);
      this.scoreElement.innerHTML = this.score;
      //console.log(
      //  `This is the number of Capitals Clicked: ${this.capitalsClicked}`
      //);

      this.citiesClickedElement.innerHTML = this.capitalsClicked;

      this.cityIndex++;

      if (this.checkIfFinished()) {
        return console.log('Game Over');
      }
      map.removeEventListener('click', waitingForClick);
      setTimeout(() => {
        this.displayCity(pickedCities);
      }, 3000);
    };
    map.addEventListener('click', waitingForClick);
  }
}
