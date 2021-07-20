import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";

export default class Renderer {
  constructor(width, height) {
    this.createRenderer();
    this.setupSize(width, height);
    this.enableShadowMap();
    this.addToDocument();
  }

  setupSize(width, height) {
    this.renderer.setSize(width, height);
  }

  enableShadowMap() {
    this.renderer.shadowMap.enabled = true;
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
  }

  addToDocument() {
    document.body.appendChild(this.renderer.domElement);
  }

  setupToneMappingWithExposure(exposure) {
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = exposure;
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }
}