export default class GameEngine {
    constructor(scene, renderer, camera) {
      this.scene = scene;
      this.renderer = renderer;
      this.camera = camera;
    }
  
    run() {
      this.runGameLoop();
    }
  
    runGameLoop() {
      this.updateGame();
      this.updatePhysics();
      this.render();
      requestAnimationFrame(() => this.runGameLoop());
    }

    updateGame() {
      this.scene.update();
    }
  
    updatePhysics() {}
  
    render() {
      this.renderer.render(this.scene.scene, this.camera);
    }
  }