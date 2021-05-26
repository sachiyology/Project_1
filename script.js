const modal = document.querySelector('.modal');
const getStarted = document.querySelector('.get-started');
const flexContainer = document.querySelector('.flex-container');

const min = 1;
const max = 10;
const interval = 5;
const gameTime = 180;

var value = Math.floor(Math.random() * (max + 1 - min)) + min;

class Player {
  constructor() {
    this.coins = 100;
    this.apple = 0;
    this.limit = 0;  //apple保持時間
  }

  buy() {
    //所持金がカブ価より多く、時間が残っている場合のみ
    if (this.coins >= value && market.getTime() > 0) {
      this.coins -= value;
      this.apple += 1;
      this.limit = 60;
      this.updateStatsOnDom();
      this.stopTimer();
      this.startCounters();
    }
  }

  sell() {
    //カブを所持しており、時間が残っている場合のみ
    if (this.apple > 0 && market.getTime() > 0) {
      this.coins += value;
      this.apple -= 1;
      /*カブを所持していない場合カウントは0*/
      if (this.apple <= 0) {
        this.limit = 0;
      }
      this.updateStatsOnDom();
    }
  }

  /*再描画*/
  updateStatsOnDom() {
    document.querySelector('.player-stats').innerHTML = `
        <div class="coins btn">
            coins: <span>${this.coins}</span>
        </div>
        <div class="apple btn">
            apple: <span>${this.apple}</span>
        </div>
        <div class="limit btn">
            Bear attacks: <span>${this.limit}</span>
        </div>
        `;
  }

  startCounters() {
  this.timer = setInterval(() => {
    this.limit--;
    this.updateStatsOnDom();

    if (1 <= this.limit && this.limit < 6) {
      kumaImage();
      kumaOn.play();
    }
    /*kumaの襲来*/

    if (this.limit < 0) {
      this.stopTimer();
      this.limit = 0;
      this.apple = 0;
      this.updateStatsOnDom();
    }
  }, 1000);
}


  stopTimer() {
    clearInterval(this.timer);
  }

  reset() {
    this.stopTimer();
    this.coins = 100;
    this.apple = 0;
    this.limit = 60;
  }
}

class Market {
  constructor() {
    this.time = gameTime;  // 残り時間
  }

  getTime() {
    return this.time;  // 残り時間取得
  }

  // カウントダウン
  startCounters() {
    this.timer = setInterval(() => {
      this.updateStatsOnDom();
      this.time--;
      if (this.time < 0) {
        this.stopTimer();
        alert('Game Over');
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);　// タイマーの停止
  }

  //
  updateStatsOnDom() {
    document.querySelector('.controls .game-time').innerHTML = `
            Remaining: <span>${this.time}</span>
        `;

    // random price
    if (this.time % interval == 0) {
      value = Math.floor(Math.random() * (max + 1 - min)) + min;
      document.querySelector('.market .value').innerHTML = `
              Current Price: <span>${value}</span>
          `;

    }
  }

  reset() {
    this.stopTimer();
    this.time = gameTime;
  }
}

const player = new Player();
const market = new Market();
const buyApple = () => player.buy();  //ボタン処理
const sellApple = () => player.sell(); //ボタン処理

/*リセットボタン押下時*/
const resetGame = () => {
  modal.classList.toggle('open');
  market.reset();
  player.reset();
  flexContainer.innerHTML = '';
}

const startGame = () => {
  modal.classList.toggle('open');
  flexContainer.innerHTML = `<div class="controls">
                    <div class="game-time btn">
                        Remaining: <span>${gameTime}</span>
                    </div>
                    <button class="reset">Reset</button>
                </div>
                <div class="market">
                    <button class="sell">Sell</button>
                    <button class="buy">Buy</button>
                    <div class="value btn">Current Price: <span>5</span></div>
                </div>
                <div class="player-stats">
                    <div class="coins btn">Coins: <span>100</span>
                    </div>
                    <div class="apple btn">Apple: <span>0</span>
                    </div>
                    <div class="limit btn">Bear Attacks: <span>0</span>
                    </div>
                </div>`;

  document.querySelector('.buy').addEventListener('click', buyApple);
  document.querySelector('.sell').addEventListener('click', sellApple);
  document.querySelector('.reset').addEventListener('click', resetGame);

  market.startCounters();  // ゲーム開始
}

getStarted.addEventListener('click', startGame);  //ボタンに関数割り当て

// クマ画像表示
function kumaImage() {
  document.querySelector('.img').innerHTML = `<img src="./images/bear_4.png">`;
}

// クマ襲来音
const kumaOn = new Audio('bull_monster.mp3');
// kumaOn.play();  // 再生
// kumaOn.pause();  // 一時停止
