const modal = document.querySelector('.modal');
const getStarted = document.querySelector('.get-started');
const flexContainer = document.querySelector('.flex-container');

const min = 1;
const max = 10;
const interval = 1;
const gameTime = 60;

var value = Math.floor( Math.random() * (max + 1 - min) ) + min;

class Player {
  constructor() {
    this.coins = 100;
    this.apple = 0;
    this.limit = 0;  //apple保持時間
  }

  buy() {
    //所持金がapple価より多く、時間が残っている場合のみ
    if (this.coins >= value && market.getTime() > 0) {
      this.coins -= value;
      this.apple += 1;
      this.limit = 10;
      this.updateStatsOnDom();
      this.stopTimer();
      this.startCounters();
      buyOn.play();
      ringoImage();
    }
  }

  sell() {
    //appleを所持しており、時間が残っている場合のみ
    if (this.apple > 0 && market.getTime() > 0) {
      this.coins += value;
      this.apple -= 1;
      sellOn.play();
      //appleを所持していない場合カウントは0
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
            &#x1fa99;: <span>${this.coins}</span>
        </div>
        <div class="apple btn">
            &#x1f34e;: <span>${this.apple}</span>
        </div>
        <div class="limit btn">
            &#x1f43b;: <span>${this.limit}</span>
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
        removeImage();
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
    this.limit = 15;
  }
}

class Market {
  constructor(pi) {
    this.time = gameTime;  // 残り時間
    this.playeritem = pi;
    this.playeritem.coins = 100;
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
        bgmOn.pause();
        if(player.coins >= 101){
          winnerOn.play();
          document.querySelector('.img').innerHTML = `<img src = "./images/pose_win_girl.png" width="25%" height="25%">`;
        }else {
          looserOn.play();
          document.querySelector('.img').innerHTML = `<img src = "./images/pose_lose_girl.png" width="25%" height="25%">`;
        }
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);　// タイマーの停止
  }

  // 再描画
  updateStatsOnDom() {
    document.querySelector('.controls .game-time').innerHTML = `
            &#x23f3;
: <span>${this.time}</span>
        `;

    // random price
    if(this.time % interval == 0){
          value = Math.floor( Math.random() * (max + 1 - min) ) + min;
          document.querySelector('.market .value').innerHTML = `
              &#x1f34e; Value: <span>${value}</span>
          `;

        }
    }

  reset() {
    this.stopTimer();
    this.time = gameTime;
  }
}

const player = new Player();
// const market = new Market();  //元の行
const market = new Market(player);
const buyApple = () => player.buy();  //ボタン処理
const sellApple = () => player.sell(); //ボタン処理


//reset game
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
                        &#8987;: <span>${gameTime}</span>
                    </div>
                    <button class="reset">Reset</button>
                </div>
                <div class="market">
                    <button class="sell">Sell</button>
                    <button class="buy">Buy</button>
                    <div class="value btn">&#x1f34e;
 Value : <span>5</span></div>
                </div>
                <div class="player-stats">
                    <div class="coins btn">&#x1fa99;
: <span>100</span>
                    </div>
                    <div class="apple btn">&#x1f34e;: <span>0</span>
                    </div>
                    <div class="limit btn">&#x1f43b;
: <span>0</span>
                    </div>
                </div>`;

  document.querySelector('.buy').addEventListener('click', buyApple);
  document.querySelector('.sell').addEventListener('click', sellApple);
  document.querySelector('.reset').addEventListener('click', resetGame);

  market.startCounters();  // ゲーム開始
  bgmOn.play();
  bgmOn.loop = true;
}

getStarted.addEventListener('click', startGame);  //ボタンに関数割り当て

// クマ画像表示
function kumaImage() {
  document.querySelector('.img').innerHTML = `<img src="./images/animal_kowai_kuma.png">`;
}
// クマ画像表示
function ringoImage() {
  document.querySelector('.img').innerHTML = `<img src="./images/kari_ringo.png">`;
}
function removeImage() {
  document.querySelector('.img').innerHTML = `<img src = ""> `;
}
// 効果音
const kumaOn = new Audio('./images/bull_monster.mp3');
const bgmOn = new Audio('./images/mario_full.mp3');
const winnerOn = new Audio('./images/won.mp3');
const looserOn = new Audio('./images/lost.mp3');
const buyOn = new Audio ('./images/sound_1.mp3');
const sellOn = new Audio ('./images/sound_2.mp3');
