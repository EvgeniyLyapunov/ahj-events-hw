import './custom-cursor.css';

export default class CustomCursor {
  constructor(overElem) {
    if( typeof(overElem) === 'string') {
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