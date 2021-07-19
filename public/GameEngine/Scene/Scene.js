export default class Scene {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.gameObjects = [];
      this.createScene();
    }
  
    createScene() {
      this.scene = new THREE.Scene();
    }
  
    addSkyBox(skybox) {
      this.scene.background = skybox.cubeTexture;
    }
  
    addLight(light) {
      this.scene.add(light);
    }
  
    addGameObject(gameObject) {
      this.scene.add(gameObject.model);
      this.gameObjects.push(gameObject);
    }
  
    update() {
      this.gameObjects.forEach((gameObject) => {
        gameObject.update();
      });
    }
  }