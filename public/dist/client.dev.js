"use strict";

// import * as THREE from "/build/three.module.js";
// import { OrbitControls } from "../scripts/three/examples/jsm/controls/OrbitControls.js";
// import Stats from "/jsm/libs/stats.module.js";
var scene, camera, renderer, hemiLight, spotLight;

function main() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  var windowsWidth = window.innerWidth;
  var windowsHeight = window.innerHeight;
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(windowsWidth, windowsHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  var hemiLight = new THREE.HemisphereLight(0xffff33, 0x5b573d, 2.5);
  scene.add(hemiLight);
  var spotLight1 = new THREE.SpotLight(0xffffff, 3);
  spotLight1.castShadow = true;
  spotLight1.shadow.bias = -0.0001;
  spotLight1.shadow.mapSize.width = 4096;
  spotLight1.shadow.mapSize.height = 4096;
  scene.add(spotLight1);
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 2;
  renderer.shadowMap.enabled = true;
  var aspect = windowsWidth / windowsHeight;
  camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 40000);
  camera.position.set(-3000, 200, 1000);
  var control = new THREE.OrbitControls(camera, renderer.domElement); //   controls.target.set(0, 0, 0);
  // control.minDistance = 100;
  // control.maxDistance = 200;

  control.update();
  var materialArrays = [];
  {
    var texture_ft = new THREE.TextureLoader().load("images/skybox1/greenery/meadow_ft.jpg");
    var texture_bk = new THREE.TextureLoader().load("images/skybox1/greenery/meadow_bk.jpg");
    var texture_up = new THREE.TextureLoader().load("images/skybox1/greenery/meadow_up.jpg");
    var texture_dn = new THREE.TextureLoader().load("images/skybox1/greenery/meadow_dn.jpg");
    var texture_rt = new THREE.TextureLoader().load("images/skybox1/greenery/meadow_rt.jpg");
    var texture_lf = new THREE.TextureLoader().load("images/skybox1/greenery/meadow_lf.jpg");
    materialArrays.push(new THREE.MeshBasicMaterial({
      map: texture_ft,
      side: THREE.BackSide
    }));
    materialArrays.push(new THREE.MeshBasicMaterial({
      map: texture_bk,
      side: THREE.BackSide
    }));
    materialArrays.push(new THREE.MeshBasicMaterial({
      map: texture_up,
      side: THREE.BackSide
    }));
    materialArrays.push(new THREE.MeshBasicMaterial({
      map: texture_dn,
      side: THREE.BackSide
    }));
    materialArrays.push(new THREE.MeshBasicMaterial({
      map: texture_rt,
      side: THREE.BackSide
    }));
    materialArrays.push(new THREE.MeshBasicMaterial({
      map: texture_lf,
      side: THREE.BackSide
    }));
  }
  scene.add(new THREE.AxesHelper(5000));
  var geometry = new THREE.BoxGeometry(1000, 1000, 1000);
  var skyBox = new THREE.Mesh(geometry, materialArrays); // scene.add(skyBox);

  new THREE.GLTFLoader().load("models/iguana/scene.gltf", function (result) {
    var model = result.scene.children[0];
    model.position.set(100.0, 2.0, -3.0);
    model.traverse(function (object1) {
      if (object1.isMesh) {
        object1.castShadow = true;
        object1.receiveShadow = true;

        if (object1.material.map) {
          object1.material.map.anisotropy = 16;
        }
      }
    }); // spotLight1.target = model;

    scene.add(model);
    draw();
  });

  function draw() {
    spotLight1.position.set(camera.position.x + 25, camera.position.y + 500, camera.position.z + 25);
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  }
}

main();
//# sourceMappingURL=client.dev.js.map
