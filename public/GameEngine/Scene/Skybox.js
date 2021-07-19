export default class Skybox {
    constructor(path, images) {
      this.cubeTexture = new THREE.CubeTextureLoader().setPath(path).load(images);
    }
  }