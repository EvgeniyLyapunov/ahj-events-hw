import './remote-control.css';

export default class RemoteControl {
  constructor(remoteControlSelector, gameWidget) {
    if(typeof(remoteControlSelector) === 'string') {
      this.remoteControl = document.querySelector('.remote-control');
    }
    this.gameWidget = gameWidget;

    this.onPressBtn = this.onPressBtn.bind(this);

    this.remoteControl.addEventListener('click', this.onPressBtn);
  }

  onPressBtn(e) {
    if(e.target.classList.contains('remote-control__start')) {
      this.gameWidget.startGame();
    } else if(e.target.classList.contains('remote-control__stop')) {
      this.gameWidget.stopGame();
    }
  }
}

