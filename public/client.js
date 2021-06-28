import * as THREE from "/build/three.module.js";
import { OrbitControls } from "/jsm/controls/OrbitControls.js";
import Stats from "/jsm/libs/stats.module.js";

let scene, camera, renderer;

function main() {
  scene = new THREE.Scene();

  const windowsWidth = window.innerWidth;
  const windowsHeight = window.innerHeight;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(windowsWidth, windowsHeight);
  document.body.appendChild(renderer.domElement);

  const aspect = windowsWidth / windowsHeight;
  camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 1000);
  camera.position.z = 2;
  // camera.position.set(-900, -200, -900);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", renderer);

  let materialArrays = [];

  let textureImages = [
    "meadow_ft.jpg",
    "meadow_bk.jpg",
    "meadow_up.jpg",
    "meadow_dn.jpg",
    "meadow_rt.jpg",
    "meadow_lf.jpg",
  ];

  for (let i = 0; i < 6; i++) {
    let texture = new THREE.TextureLoader().load(
      `../images/skyboxday1/greenery/${textureImages[i]}`
    );
    let material = new THREE.MeshBasicMaterial({ map: texture });
    materialArrays.push(material);
  }

  const geometry = new THREE.boxGeometry(10000, 10000, 10000);

  let skyBox = new THREE.Mesh(geometry, materialArrays);
  scene.add(skyBox);
  function draw() {
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  }
}

main();
