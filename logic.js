class GeoGame {
  constructor(capitals) {
    this.capitals = capitals;
    this.pickedCapitals = [];
    this.numberOfCapitals = 5;
    this.capitalsClicked = 0;
    this.score = 0;
    this.maxDist1 = 10;
    this.maxDist2 = 30;
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
}
