import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";

export default class GameEngine {
    constructor(scene, renderer, camera, animationList) {
      this.scene = scene;
      this.renderer = renderer;
      this.camera = camera;
      this.animationList = animationList;
      this.clock = new THREE.Clock();
    
    }
  
    run() {
      this.runGameLoop();
    }
  
    runGameLoop() {
      let delta = this.clock.getDelta();
      delta = Math.min(delta, 0.0900);
      this.updateGame(delta);
      this.updatePhysics();
      this.render();
      requestAnimationFrame(() => this.runGameLoop());
    }

    updateGame(deltaTime) {
      this.scene.update();
      this.animationList.forEach((animation)=>{
        animation.update(deltaTime);
      })
    }
  
    updatePhysics() {}
  
    render() {
      this.renderer.render(this.scene.scene, this.camera);
    }
  }