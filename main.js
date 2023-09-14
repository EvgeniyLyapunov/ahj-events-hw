/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/components/game-widget/game-widget.js

class Widget {
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
    for (let fieldItem of this.fieldItems) {
      fieldItem.classList.remove("yoda-img");
    }
  }
  onFieldClick(e) {
    if (e.target.classList.contains('yoda-img')) {
      this.playMp3();
      e.target.classList.remove('yoda-img');
      e.target.classList.add('boom-img');
      this.score += 1;
      this.scoreValue.textContent = this.score;
      if (this.score % 5 === 0) {
        this.level += 1;
        this.speedShow -= 50;
        this.levelValue.textContent = this.level;
        clearInterval(this.play);
        this.createGameAction();
      }
      setTimeout(() => {
        e.target.classList.remove('boom-img');
      }, 200);
    } else {
      this.fail += 1;
      this.failValue.textContent = `${this.fail}`;
      if (this.fail === 5) {
        this.stopGame();
        return;
      }
    }
  }
  createGameAction() {
    this.play = setInterval(() => {
      const activeSquare = this.fieldItems[Math.floor(Math.random() * this.fieldItems.length)];
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
;// CONCATENATED MODULE: ./src/js/components/remote-control/RemoteControl.js

class RemoteControl {
  constructor(remoteControlSelector, gameWidget) {
    if (typeof remoteControlSelector === 'string') {
      this.remoteControl = document.querySelector('.remote-control');
    }
    this.gameWidget = gameWidget;
    this.onPressBtn = this.onPressBtn.bind(this);
    this.remoteControl.addEventListener('click', this.onPressBtn);
  }
  onPressBtn(e) {
    if (e.target.classList.contains('remote-control__start')) {
      this.gameWidget.startGame();
    } else if (e.target.classList.contains('remote-control__stop')) {
      this.gameWidget.stopGame();
    }
  }
}
;// CONCATENATED MODULE: ./src/js/components/custom-cursor/custom-cursor.js

class CustomCursor {
  constructor(overElem) {
    if (typeof overElem === 'string') {
      this._overElem = document.querySelector(overElem);
    }
    this.body = document.querySelector('body');
    this.cursor = document.createElement('div');
    this.cursorChangeToCustom = this.cursorChangeToCustom.bind(this);
    this.cursorChangeToDefault = this.cursorChangeToDefault.bind(this);
    this.cursorMove = this.cursorMove.bind(this);
    this.addBodyStyle = this.addBodyStyle.bind(this);
    this.removeBodyStyle = this.removeBodyStyle.bind(this);
    this._overElem.addEventListener('mouseenter', this.cursorChangeToCustom);
    this._overElem.addEventListener('mouseleave', this.cursorChangeToDefault);
  }
  cursorChangeToCustom(e) {
    document.addEventListener('mousemove', this.cursorMove);
    this.cursor.classList.toggle('custom-cursor');
    this.addBodyStyle();
  }
  cursorChangeToDefault(e) {
    document.removeEventListener('mousemove', this.cursorMove);
    this.cursor.classList.toggle('custom-cursor');
    this.removeBodyStyle();
  }
  cursorMove(e) {
    let x = e.clientX;
    let y = e.clientY;
    this.cursor.style.left = x + "px";
    this.cursor.style.top = y + "px";
  }
  addBodyStyle() {
    this.body.classList.add('cursor-none');
    this.body.insertAdjacentElement('beforeend', this.cursor);
  }
  removeBodyStyle() {
    this.body.classList.remove('cursor-none');
    this.cursor.remove();
  }
}
;// CONCATENATED MODULE: ./src/js/app.js



const widget = new Widget(".box");
const remoteControl = new RemoteControl('.remote-control', widget);
const customCursor = new CustomCursor('.box');

// widget.startGame();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;