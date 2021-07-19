import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
import { SkeletonUtils } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/utils/SkeletonUtils.js";

class Player {
  constructor(scene, key) {
    console.log(models)
    this.model = models[key];
    console.log(models[key]);
    this.clonedScene = SkeletonUtils.clone(models[key].gltf.scene);
    const rootObject = new THREE.Object3D();
    scene.add(rootObject);
    this.mixer = new THREE.AnimationMixer(this.clonedScene);
    this.actions = {};
  }
  setActiveAnimation(animationName) {
    const animationClip = this.model.animationClip[animationName];
    if (!animationClip) {
      console.warn("desired animation clip is not found in animations list");
      return;
    }
    Object.values(this.actions).forEach((action) => {
      action.enabled = false;
    });
    const action = this.mixer.clipAction(animationClip);
    this.actions[animationName] = action;
    action.enabled = true;
    // we are resetting here just to avoid case for the action with completed cycle/loop
    action.reset();
    action.play();
  }
  update() {
    this.mixer.update(globalValues.deltaTime);
  }
}

export default Player;
