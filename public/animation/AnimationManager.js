import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";

class LoadModel{
  constructor(models, callback) {
    this.models = models;
    const manager = new THREE.LoadingManager();
    manager.onLoad = callback;
    let gltfLoader = new GLTFLoader(manager);
    for (let model of Object.values(this.models)) {
      gltfLoader.load(model.url, (gltf) => {
        model.gltf = gltf;
      });
    }
  }
  manageAnimation() {
    for (const model of Object.values(this.models)) {
      model.animationClip = {};
      console.log(model)
      model.gltf.animations.forEach((value, index) => {
        model.animationClip[value.name] = model.gltf.animations[index];
      });
    }
  }
}


export default LoadModel;