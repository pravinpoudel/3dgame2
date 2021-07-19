export default class MouseInputHandler {
  constructor(listener) {
    this.listener = listener;
    this.setupMouseMoveListener();
    this.lockPointer();
  }

  setupMouseMoveListener() {
    let self = this;
    document.onmousemove = function (mouseEvent) {
      self.listener(mouseEvent.movementX, mouseEvent.movementY);
    };
  }

  lockPointer() {
    document.onmousedown = function () {
      document.body.requestPointerLock();
    };
  }
}