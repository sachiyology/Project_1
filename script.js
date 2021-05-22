class apple {
  constructor(numApple, coins, rate) {
    this.numApple = numApple;
    this.coins = coins;
    this.rate = rate;
  }
}

function randomizer(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min));
}

const apple = []
