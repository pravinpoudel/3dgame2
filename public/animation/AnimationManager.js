import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";
import { SkeletonUtils } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/utils/SkeletonUtils.js";

class AnimationManager{
  constructor(gltf) {
    this.gltf = gltf;
    const clonedScene = SkeletonUtils.clone(this.gltf.scene);
    this.rootObject = new THREE.Object3D();
    this.rootObject.add(clonedScene)
    this.mixer = new THREE.AnimationMixer(clonedScene);
    this.directionVector = new THREE.Vector3(0, 0, 1);
    this.actions = {};
    this.animationClip = {};
   }

  manageAnimation() {
    let self = this;
    self.gltf.animations.forEach((value, index) => {
        self.animationClip[value.name] = self.gltf.animations[index];
      });
    }

  setActiveAnimation(animationName) {
    let self = this;
    let animationClip = self.animationClip[animationName];
    if (!animationClip) {
      console.warn("desired animation clip is not found in animations list");
      return;
    }
    Object.values(self.actions).forEach((action) => {
      action.enabled = false;
    });
    const action = self.mixer.clipAction(animationClip);
    self.actions[animationName] = action;
    action.enabled = true;
    action.reset();
    action.play();
  }

  update(deltaTime){
    this.mixer.update(deltaTime);
    let meshPosition = new THREE.Vector3();
    this.rootObject.getWorldPosition(meshPosition);
    // console.log(meshPosition)
  }

  }


export default AnimationManager;