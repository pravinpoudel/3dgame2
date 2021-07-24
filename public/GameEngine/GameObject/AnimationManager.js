import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";

class AnimationManager{
  constructor(scene, animations) {
    this.mixer = new THREE.AnimationMixer(scene);
    this.actions = {};
    this.animationClip = {};
    this.prevAnimation = null;
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
    let prevAction = this.actions[this.prevAnimation]
    const action = this.mixer.clipAction(animationClip);
    this.actions[animationName] = action;
    action.enabled = true
    action.reset()
    action.clampWhenFinished = true
    if (prevAction) {
      action.crossFadeFrom(prevAction, 0.1, true)
    }
    action.play()
    this.prevAnimation = animationName
  }

  update(deltaTime){
    this.mixer.update(deltaTime);
  }

}
 

export default AnimationManager;