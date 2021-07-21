import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";

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
      this.scene.add(gameObject.object);
      this.gameObjects.push(gameObject);
    }
  
    update(deltaTime) {
      this.gameObjects.forEach((gameObject) => {
        gameObject.update(deltaTime);
      });
    }
  }