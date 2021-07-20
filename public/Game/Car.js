import GameObject from "/GameEngine/GameObject/GameObject.js";

export default class Car extends GameObject {
    constructor(model) {
      super(model);
      this.speed = 1;
      this.direction = { x: 0, y: 0, z: 0 };
      this.angle = { z: 0 };
    }
  
    update() {
      this.model.translateOnAxis(this.direction, this.speed);
      this.model.rotation.z = this.angle.z;
    }
  }