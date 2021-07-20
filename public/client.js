import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";

import {resizeRendererToDisplaySize} from "/helper/main.js"

import GameEngine from "/GameEngine/GameEngine.js";
import Renderer from "/GameEngine/Renderer.js";
import Scene from "/GameEngine/Scene/Scene.js";
import Skybox from "/GameEngine/Scene/Skybox.js";
import Car from "/Game/Car.js";
import CarInputController from "./Game/CarInputController.js";
import GameObjectCreater from "/objectCreator/GameObjectCreater.js";
import Player from "/animation/Player.js"
import AnimationManager from "/animation/AnimationManager.js"

const windowsWidth = window.innerWidth;
const windowsHeight = window.innerHeight;

function addSkyBoxToScene(scene) {
  let path = "images/skybox1/greenery/";
  let images = [
    "meadow_ft.jpg",
    "meadow_bk.jpg",
    "meadow_up.jpg",
    "meadow_dn.jpg",
    "meadow_rt.jpg",
    "meadow_lf.jpg",
  ];
  let skybox = new Skybox(path, images);
  scene.addSkyBox(skybox);
}

function addHemiLight(scene) {
  const hemiLight = new THREE.HemisphereLight(0xffff33, 0x5b573d, 2.5);
  scene.addLight(hemiLight);
}

function addSpotLight(scene) {
  const spotLight1 = new THREE.SpotLight(0xffffff, 3);
  spotLight1.castShadow = true;
  spotLight1.shadow.bias = -0.0001;
  spotLight1.shadow.mapSize.width = 4096;
  spotLight1.shadow.mapSize.height = 4096;
  scene.addLight(spotLight1);
}

function addLightToScene(scene) {
  addHemiLight(scene);
  addSpotLight(scene);
}

function createCamera() {
  const aspect = windowsWidth / windowsHeight;
  let camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 40000);
  camera.position.set(0, 10, 10);

  return camera;
}

function setupCameraControl(camera, renderer) {
  let control = new OrbitControls(camera, renderer.renderer.domElement);
  control.update();
}

function addModelToScene(scene) {
  new GLTFLoader().load("models/house/scene.gltf", (result) => {
    let model = result.scene.children[0];
    model.position.set(0.0, 0.0, 0.0);
    model.traverse((object1) => {
      if (object1.isMesh) {
        object1.castShadow = true;
        object1.receiveShadow = true;

        if (object1.material.map) {
          object1.material.map.anisotropy = 16;
        }
      }
    });
    let car = new Car(model);
    let controller = new CarInputController(car);
    scene.addGameObject(car);
  });
}

function createRenderer() {
  let renderer = new Renderer(windowsWidth, windowsHeight);
  renderer.setupToneMappingWithExposure(2);
  return renderer;
}

function createScene() {
  let scene = new Scene(windowsWidth, windowsHeight);

  addLightToScene(scene);
  addSkyBoxToScene(scene);
  addModelToScene(scene);
  return scene;
}



function main() {
  let renderer = createRenderer();
  let scene = createScene();
  let camera = createCamera();
  const manager = new THREE.LoadingManager();
  const loader = new GLTFLoader(manager);
  manager.onLoad = initilization;

  let loaderElement = document.getElementsByClassName("loader")[0];
  
  const url = "https://threejsfundamentals.org/threejs/resources/models/knight/KnightCharacter.gltf";
  let player = new GameObjectCreater(Player, url, loader);
  let animationaList = [];
  function initilization(){
    loaderElement.style.display = "none";
    const animation = new AnimationManager(player.object.gltf);
    scene.scene.add(animation.rootObject);
    animation.manageAnimation();
    animation.setActiveAnimation("Run");
    animationaList.push(animation);
  }
  setupCameraControl(camera, renderer);

  let engine = new GameEngine(scene, renderer, camera, animationaList);
  engine.run();
}

main();
