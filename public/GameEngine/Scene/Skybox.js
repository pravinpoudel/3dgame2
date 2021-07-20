import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";


export default class Skybox {
    constructor(path, images) {
      this.cubeTexture = new THREE.CubeTextureLoader().setPath(path).load(images);
    }
  }