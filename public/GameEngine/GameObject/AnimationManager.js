import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";
import { SkeletonUtils } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/utils/SkeletonUtils.js";

class AnimationManager{
  constructor(scene, animations) {
    this.mixer = new THREE.AnimationMixer(scene);
    this.actions = null;
    this.animationClip = {};
    this.manageAnimation(animations)
   }

  manageAnimation(animations) {
    let self = this;
    animations.forEach((value, index) => {
        self.animationClip[value.name] = animations[index];
      });
    }

  setActiveAnimation(animationName) {
    let animationClip = this.animationClip[animationName];
    if (!animationClip) {
      console.warn("desired animation clip is not found in animations list");
      return;
    }
    if(this.action != null) {
      this.action.enabled = false;
    }
    this.action = this.mixer.clipAction(animationClip);
    this.action.enabled = true
    this.action.reset()
    this.action.play()
  }

  update(deltaTime){
    this.mixer.update(deltaTime);
  }

  }


export default AnimationManager;