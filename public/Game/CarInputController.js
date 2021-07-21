import KeyboardInputHandler from "/GameEngine/Input/KeyboardInputHandler.js";
import MouseInputHandler from "/GameEngine/Input/MouseInputHandler.js";
import { Keys, KeyState } from "../GameEngine/Input/KeyConstants.js";

export default class CarInputController {
    constructor(car) {
      this.mouseSensitivity = 200;
      this.car = car;
      let k = new KeyboardInputHandler((key, state) =>
        this.listenKeyEvent(key, state)
      );
      let m = new MouseInputHandler((x, y) => this.listenMouseMovement(x, y));
    }
  
    listenMouseMovement(x, y) {
      this.car.angle.y += x / this.mouseSensitivity;
    }
  
    moveLeft(state) {
      if (state == KeyState.DOWN) {
        this.car.direction.x = -1;
      } else if (this.car.direction.x == -1) {
        this.car.direction.x = 0;
      }
    }
  
    moveRight(state) {
      if (state == KeyState.DOWN) {
        this.car.direction.x = 1;
      } else if (this.car.direction.x == 1) {
        this.car.direction.x = 0;
      }
    }
  
    moveDown(state) {
      if (state == KeyState.DOWN) {
        this.car.direction.z = -1;
      } else if (this.car.direction.z == -1) {
        this.car.direction.z = 0;
      }
    }
  
    moveUp(state) {
      if (state == KeyState.DOWN) {
        this.car.direction.z = 1;
      } else if (this.car.direction.z == 1) {
        this.car.direction.z = 0;
      }
    }
  
    listenKeyEvent(key, state) {
      if (key == Keys.LEFT) {
        this.moveLeft(state);
      }
      if (key == Keys.DOWN) {
        this.moveDown(state);
      }
      if (key == Keys.RIGHT) {
        this.moveRight(state);
      }
      if (key == Keys.UP) {
        this.moveUp(state);
      }
    }
  }
  