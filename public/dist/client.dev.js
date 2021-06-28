"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var THREE = _interopRequireWildcard(require("/build/three.module.js"));

var _OrbitControls = require("/jsm/controls/OrbitControls.js");

var _statsModule = _interopRequireDefault(require("/jsm/libs/stats.module.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var url = new URL("/build/three.module.js");
console.log(url);
var scene, camera, renderer;

function main() {
  scene = new THREE.Scene();
  var windowsWidth = window.innerWidth;
  var windowsHeight = window.innerHeight;
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(windowsWidth, windowsHeight);
  document.body.appendChild(renderer.domElement);
  var aspect = windowsWidth / windowsHeight;
  camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 1000);
  camera.position.z = 2; // camera.position.set(-900, -200, -900);

  var controls = new _OrbitControls.OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", renderer);
  var materialArrays = [];
  var textureImages = ["meadow_ft.jpg", "meadow_bk.jpg", "meadow_up.jpg", "meadow_dn.jpg", "meadow_rt.jpg", "meadow_lf.jpg"];

  for (var i = 0; i < 6; i++) {
    var texture = new THREE.TextureLoader().load("../images/skyboxday1/greenery/".concat(textureImages[i]));
    var material = new THREE.MeshBasicMaterial({
      map: texture
    });
    materialArrays.push(material);
  }

  var geometry = new THREE.boxGeometry(10000, 10000, 10000);
  var skyBox = new THREE.Mesh(geometry, materialArrays);
  scene.add(skyBox);

  function draw() {
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  }
}

main();
//# sourceMappingURL=client.dev.js.map
