import { SkeletonUtils } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/utils/SkeletonUtils.js";
import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";

export default class GameObject {
  constructor(gltf) {
    const clonedScene = SkeletonUtils.clone(gltf.scene);
    this.object = new THREE.Object3D();
    this.object.add(clonedScene)
  }

  update(deltaTime) {}
}