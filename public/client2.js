import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js";

function main() {
  const canvas = document.getElementById("main-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#aaaaaa");

  const windowsWidth = window.innerWidth;
  const windowsHeight = window.innerHeight;

  const aspect = windowsWidth / windowsHeight;
  let camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 40000);
  camera.position.set(0, 1.5, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.update();

  const manager = new THREE.LoadingManager();
  manager.onLoad = init;

  function init() {
    manageAnimation();
    console.log("all loaded");
  }

  const models = {
    pig: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Pig.gltf",
    },
    cow: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Cow.gltf",
    },
    llama: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Llama.gltf",
    },
    pug: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Pug.gltf",
    },
    sheep: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Sheep.gltf",
    },
    zebra: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Zebra.gltf",
    },
    horse: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Horse.gltf",
    },
    knight: {
      url: "https://threejsfundamentals.org/threejs/resources/models/knight/KnightCharacter.gltf",
    },
  };

  let gltfLoader = new GLTFLoader(manager);
  for (let model of Object.values(models)) {
    gltfLoader.load(model.url, (gltf) => {
      model.gltf = gltf;
    });
  }

  function manageAnimation() {
    for (const model of Object.values(models)) {
      model.animationClip = {};
      model.gltf.animations.forEach((value, index) => {
        model.animationClip[value.name] = model.gltf.animations[index];
      });
    }
  }
}

main();
