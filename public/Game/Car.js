import AnimationManager from "/GameEngine/GameObject/AnimationManager.js";
import GameObject from "/GameEngine/GameObject/GameObject.js";

const CarState = {
  RUN: 'Run',
  IDLE: 'Idle'
}

export default class Car extends GameObject {
    constructor(gltf) {
      super(gltf);
      this.speed = 0.25;
      this.direction = { x: 0, y: 0, z: 0 };
      this.angle = { y: 0 };
      this.animationManager = new AnimationManager(this.object, gltf.animations)
      this.setState(CarState.IDLE)
    }
  
    update(deltaTime) {
      this.object.translateOnAxis(this.direction, this.speed);
      this.object.rotation.y = this.angle.y;
      this.animationManager.update(deltaTime)
      this.checkMovement()
    }

    checkMovement() {
      if (this.direction.x == 0 && this.direction.z == 0) {
        if (this.state != CarState.IDLE) {
          this.setState(CarState.IDLE)
        }
      } else if(this.state != CarState.RUN) {
        this.setState(CarState.RUN)
      }
    }

    setState(state) {
      this.state = state
      this.animationManager.setActiveAnimation(state)
    }
  }