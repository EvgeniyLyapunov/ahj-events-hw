import './game-widget.css';

export default class Widget {
  constructor(gameFieldSelector) {
    this.gameField = document.querySelector(gameFieldSelector);
    this.fieldItems = this.gameField.querySelectorAll(".square");
    this.audioContainer = document.querySelector('#audioContainer');
    this.scoreValue = document.querySelector('.game-state__score-value');
    this.levelValue = document.querySelector('.game-state__level-value');
    this.failValue = document.querySelector('.game-state__fail-value');
    this.speedShow = 1000;
    this.title = '';
    this.score = 0;
    this.level = 1;
    this.fail = 0;

    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.onFieldClick = this.onFieldClick.bind(this);
    this.createGameAction = this.createGameAction.bind(this);
    this.initialNewGame = this.initialNewGame.bind(this);
    this.playMp3 = this.playMp3.bind(this);
  }

  

  startGame() {
    document.querySelector('.title').textContent = 'Hi, commander!';
    this.gameField.addEventListener('click', this.onFieldClick);
    this.initialNewGame();
    this.createGameAction();
  }

  stopGame() {
    document.querySelector('.title').textContent = 'Have a good day, boss!';
    this.gameField.removeEventListener('click', this.onFieldClick);
    clearInterval(this.play);
    for(let fieldItem of this.fieldItems) {
      fieldItem.classList.remove("yoda-img");
    }
  }

  onFieldClick(e) {
    if(e.target.classList.contains('yoda-img')) {
      this.playMp3();
      e.target.classList.remove('yoda-img');
      e.target.classList.add('boom-img');
      this.score += 1;
      this.scoreValue.textContent = this.score;
      if(this.score % 5 === 0) {
        this.level += 1;
        this.speedShow -= 50;
        this.levelValue.textContent = this.level;
        clearInterval(this.play);
        this.createGameAction();
      }
      setTimeout(() => {
        e.target.classList.remove('boom-img');
      }, 200)
    } else {
      this.fail += 1;
      this.failValue.textContent = `${this.fail}`;
      if(this.fail === 5) {
        this.stopGame();
        return;
      }
    }
  }

  createGameAction() {
    this.play = setInterval(() => {
      const activeSquare =
      this.fieldItems[Math.floor(Math.random() * this.fieldItems.length)];
      activeSquare.classList.add("yoda-img");
      setTimeout(() => {
        activeSquare.classList.remove("yoda-img");
      }, this.speedShow);
    }, this.speedShow);
  }

  initialNewGame() {

    this.speedShow = 1000;
    this.score = 0;
    this.level = 1;
    this.fail = 0;
    this.scoreValue.textContent = `${this.score}`;
    this.levelValue.textContent = `${this.level}`;
    this.failValue.textContent = `${this.fail}`;
  }

  playMp3() { 
    this.audioContainer.play(); 
  } 
}
