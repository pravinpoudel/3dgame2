import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
import { SkeletonUtils } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/utils/SkeletonUtils.js";

class Player {
  
  constructor(scene, models, key) {

    this.model = models[key];
    this.clonedScene = SkeletonUtils.clone(models[key].gltf.scene);

    this.rootObject = new THREE.Object3D();
    this.rootObject.add(this.clonedScene)
    scene.add(this.rootObject);
    this.mixer = new THREE.AnimationMixer(this.clonedScene);

    this.directionVector = new THREE.Vector3(0, 0, 1);
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
    action.reset();
    action.play();
  }

  update(deltaTime, camera) {
    this.mixer.update(deltaTime);
    const deltaValue = 0.0;
    this.rootObject.rotation.y = Math.PI + deltaValue;
    this.rootObject.translateOnAxis(this.directionVector, 0.09);
    let meshPosition = new THREE.Vector3();
    this.rootObject.getWorldPosition(meshPosition);
    camera.lookAt(meshPosition);
    // camera.position.set(meshPosition.x, meshPosition.y +4, meshPosition.z+ 20);
  }
}

export default Player;
