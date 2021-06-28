// import * as THREE from "/build/three.module.js";
// import { OrbitControls } from "../scripts/three/examples/jsm/controls/OrbitControls.js";
// import Stats from "/jsm/libs/stats.module.js";

let scene, camera, renderer;

function main() {
  scene = new THREE.Scene();

  const windowsWidth = window.innerWidth;
  const windowsHeight = window.innerHeight;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(windowsWidth, windowsHeight);
  document.body.appendChild(renderer.domElement);

  const aspect = windowsWidth / windowsHeight;
  camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 40000);
  camera.position.z = 1;

  let control = new THREE.OrbitControls(camera, renderer.domElement);
//   controls.target.set(0, 0, 0);
  
  control.minDistance = 0;
  control.maxDistance = 200
  control.update();


  let materialArrays = [];

   let texture_ft = new THREE.TextureLoader().load( `images/skybox1/greenery/meadow_ft.jpg`);
   let texture_bk = new THREE.TextureLoader().load( `images/skybox1/greenery/meadow_bk.jpg`);
   let texture_up = new THREE.TextureLoader().load( `images/skybox1/greenery/meadow_up.jpg`);
   let texture_dn = new THREE.TextureLoader().load( `images/skybox1/greenery/meadow_dn.jpg`);
   let texture_rt = new THREE.TextureLoader().load( `images/skybox1/greenery/meadow_rt.jpg`);
   let texture_lf = new THREE.TextureLoader().load( `images/skybox1/greenery/meadow_lf.jpg`);


	materialArrays.push(new THREE.MeshBasicMaterial({ map: texture_ft, side:THREE.BackSide }));
	materialArrays.push(new THREE.MeshBasicMaterial({ map: texture_bk,  side:THREE.BackSide }));
	materialArrays.push(new THREE.MeshBasicMaterial({ map: texture_up,  side:THREE.BackSide }));
	materialArrays.push(new THREE.MeshBasicMaterial({ map: texture_dn,  side:THREE.BackSide }));
	materialArrays.push(new THREE.MeshBasicMaterial({ map: texture_rt,  side:THREE.BackSide }));
	materialArrays.push(new THREE.MeshBasicMaterial({ map: texture_lf,  side:THREE.BackSide }));

  const geometry = new THREE.BoxGeometry(1000, 1000, 1000);
  let skyBox = new THREE.Mesh(geometry,  materialArrays );
  scene.add(skyBox);

  draw();

  function draw() {
	  console.log(camera.position.z)
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  }
  }

main();
