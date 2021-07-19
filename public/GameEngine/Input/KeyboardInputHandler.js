export default class KeyboardInputHandler {
    constructor(listener) {
      this.listner = listener;
      this.setupKeyUpListener();
      this.setupKeyDownListener();
    }
  
    setupKeyUpListener() {
      let self = this;
      document.onkeyup = function (keyEvent) {
        self.listner(keyEvent.key, KeyState.UP);
      };
    }
  
    setupKeyDownListener() {
      let self = this;
      document.onkeydown = function (keyEvent) {
        self.listner(keyEvent.key, KeyState.DOWN);
      };
    }
  }
  