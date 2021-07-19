import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js";
import {resizeRendererToDisplaySize} from "/helper/main.js"
import Player from "/animation/Player.js";
import LoadModel from "/animation/animationManager.js";

function main() {
  const canvas = document.getElementById("main-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas });
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#aaaaaa");

  let loaderElement = document.getElementsByClassName("loader")[0];

  {
    const ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 200, 100);
    scene.add(dirLight);
  }

  const windowsWidth = window.innerWidth;
  const windowsHeight = window.innerHeight;

  const aspect = windowsWidth / windowsHeight;
  let camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 40000);
  camera.position.set(0, 1.5, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.update();

  const globalValues = {
    deltaTime: 0,
  };

  const manager = new THREE.LoadingManager();
  manager.onLoad = initialize;

  let models = {
    boy: {
      url: "https://threejsfundamentals.org/threejs/resources/models/knight/KnightCharacter.gltf",
    },
  };

  let managedModel = new LoadModel(models, initialize);
  let player;

  function initialize() {
    loaderElement.style.display = "none";
    managedModel.manageAnimation();
    player = new Player(scene, models, "boy");
    player.setActiveAnimation("Run");
    draw();
  }
  resizeRendererToDisplaySize(renderer);

  let clock = new THREE.Clock();

  function draw(now) {
    const delta = clock.getDelta();
    globalValues.deltaTime = Math.min(delta, 0.0900);
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    player.update(globalValues.deltaTime, camera);
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  }
}

main();
