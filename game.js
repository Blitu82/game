class GeoGame {
  constructor(capitals) {
    this.startScreen = document.getElementById('game-intro');
    this.gameIntructions = document.getElementById('game-instructions');
    this.gameScreen = document.getElementById('game-container');
    this.gameEndScreen = document.getElementById('game-end');
    this.map = document.getElementById('map');
    this.cityGuess = document.getElementById('city-guess');
    this.citiesToClick = document.getElementById('cities-to-click');
    this.scoreElement = document.getElementById('score');
    this.endScoreElement = document.getElementById('end-score');
    this.citiesClickedElement = document.getElementById('cities-clicked');
    this.dotCity = document.getElementById('dot-city');
    this.dotClick = document.getElementById('dot-click');
    this.userFeedback = document.getElementById('user-feedback');
    this.distanceFeeback = document.getElementsByClassName('distance');
    this.pointsFeeback = document.getElementsByClassName('points');

    this.capitals = capitals;
    this.cityIndex = 0;
    this.pickedCapitals = [];
    this.numberOfCapitals = 5;
    this.capitalsClicked = 0;
    this.score = 0;
    this.maxDist1 = 10;
    this.maxDist2 = 30;
  }

  // To go from start page to the instructions page

  start() {
    this.startScreen.style.display = 'none';
    this.gameIntructions.style.display = 'block';
  }

  // To go from the instructions page to the game

  next() {
    this.gameIntructions.style.display = 'none';
    this.gameScreen.style.display = 'block';
  }

  // Based on the selected continent, this function filters the cities to choose from

  filterCapitals(chosenContinent) {
    const filteredArr = this.capitals.filter(city => {
      return city.continent === chosenContinent;
    });
    return filteredArr;
  }

  // Takes the original array with all the cities and puts 5/10 random ones in a new array

  shuffleCapitals(filteredCapitals) {
    if (filteredCapitals) {
      const copyArr = JSON.parse(JSON.stringify(filteredCapitals));
      copyArr.sort(() => Math.random() - 0.5);
      this.pickedCapitals = copyArr.slice(0, this.numberOfCapitals);
      return this.pickedCapitals;
    }
  }

  // Calculates the distance between the user's click and the actual city coordinates

  calculateDist(pickedCity, userClick) {
    const deltaX = userClick[0] - pickedCity.coordinates[0];
    const deltaY = userClick[1] - pickedCity.coordinates[1];
    const dist = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    return dist;
  }

  // Draw two circles. One for the city and one for the click

  drawLocations(pickedCity, userClick) {
    const cityX =
      (pickedCity.coordinates[0] * this.map.width) / this.map.naturalWidth;
    const cityY =
      (pickedCity.coordinates[1] * this.map.height) / this.map.naturalHeight;

    this.dotClick.style.display = 'block';
    this.dotClick.style.top = userClick[1] + 'px';
    this.dotClick.style.left = userClick[0] + 'px';

    this.dotCity.style.display = 'block';
    this.dotCity.style.top = cityY + 'px';
    this.dotCity.style.left = cityX + 'px';

    setTimeout(() => {
      this.dotCity.style.display = 'none';
      this.dotClick.style.display = 'none';
    }, 2000);
  }

  // Converts pixels to Km for Europe and Asia.

  convertPixelsToKm(distance) {
    if (this.pickedCapitals[0].continent === 'Europe') {
      const distanceKm = (distance * 503.1) / 133.15;
      return distanceKm.toFixed(1);
    } else if (this.pickedCapitals[0].continent === 'Asia') {
      const distanceKm = (distance * 2092.3) / 409.09;
      return distanceKm.toFixed(1);
    }
  }

  // Displays for the user the number of points he/she got and the distance from the actual target

  displayUserFeedback(score, dist) {
    this.userFeedback.style.display = 'block';
    this.pointsFeeback[0].innerHTML = `+${score} points`;
    this.distanceFeeback[0].innerHTML = `${this.convertPixelsToKm(dist)} Km`;

    setTimeout(() => {
      this.userFeedback.style.display = 'none';
    }, 2000);
  }

  // Updates this.score and this.capitalsClicked

  scoreUpdate(dist) {
    if (dist <= this.maxDist1) {
      this.score += 2;
      this.capitalsClicked++;
      return 2;
    } else if (dist <= this.maxDist2 && dist > this.maxDist1) {
      this.score += 1;
      this.capitalsClicked++;
      return 1;
    } else {
      this.capitalsClicked++;
      return 0;
    }
  }

  // Checks if the user has gone through all cities in the array
  // If so the game ends

  checkIfFinished() {
    if (this.capitalsClicked === this.numberOfCapitals) {
      return true;
    } else {
      return false;
    }
  }

  // Main function that runs through the array and asks the user to click in a given city.

  displayCity(pickedCities) {
    if (this.cityIndex < pickedCities.length) {
      this.cityGuess.innerHTML = `Where is ${
        pickedCities[this.cityIndex].name
      }?`;
    }

    const waitingForClick = event => {
      const x = event.offsetX;
      const y = event.offsetY;
      const mapWidth = this.map.width;
      const mapHeight = this.map.height;
      const scaledX = (x / mapWidth) * this.map.naturalWidth;
      const scaledY = (y / mapHeight) * this.map.naturalHeight;
      const userClick = [scaledX, scaledY];
      console.log(`The coordinates are x = ${scaledX} and y =  ${scaledY}`);
      const distance = this.calculateDist(
        pickedCities[this.cityIndex],
        userClick
      );
      console.log(
        `The distance to ${pickedCities[this.cityIndex].name} is ${distance}`
      );

      this.drawLocations(pickedCities[this.cityIndex], [x, y]);

      const updateTheScore = this.scoreUpdate(distance);

      this.displayUserFeedback(updateTheScore, distance);

      this.scoreElement.innerHTML = this.score;

      this.citiesClickedElement.innerHTML = this.capitalsClicked;

      this.cityIndex++;

      if (this.checkIfFinished()) {
        setTimeout(() => {
          this.gameScreen.style.display = 'none';
          this.gameEndScreen.style.display = 'block';
          this.endScoreElement.innerHTML = this.score;
        }, 1000);
      }
      map.removeEventListener('click', waitingForClick);

      setTimeout(() => {
        this.displayCity(pickedCities);
      }, 2000);
    };
    map.addEventListener('click', waitingForClick);
  }
}
