"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var THREE = _interopRequireWildcard(require("https://cdn.skypack.dev/three@0.128.0/build/three.module.js"));

var _OrbitControls = require("https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js");

var _GLTFLoader = require("https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function main() {
  var canvas = document.getElementById("main-canvas");
  var renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  var scene = new THREE.Scene();
  scene.background = new THREE.Color("#aaaaaa");
  var windowsWidth = window.innerWidth;
  var windowsHeight = window.innerHeight;
  var aspect = windowsWidth / windowsHeight;
  var camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 40000);
  camera.position.set(0, 1.5, 20);
  var controls = new _OrbitControls.OrbitControls(camera, canvas);
  controls.update();
  var manager = new THREE.LoadingManager();
  manager.onLoad = init;

  function init() {
    manageAnimation();
    console.log("all loaded");
  }

  var models = {
    pig: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Pig.gltf"
    },
    cow: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Cow.gltf"
    },
    llama: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Llama.gltf"
    },
    pug: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Pug.gltf"
    },
    sheep: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Sheep.gltf"
    },
    zebra: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Zebra.gltf"
    },
    horse: {
      url: "https://threejsfundamentals.org/threejs/resources/models/animals/Horse.gltf"
    },
    knight: {
      url: "https://threejsfundamentals.org/threejs/resources/models/knight/KnightCharacter.gltf"
    }
  };
  var gltfLoader = new _GLTFLoader.GLTFLoader(manager);

  var _loop2 = function _loop2() {
    var model = _Object$values[_i];
    gltfLoader.load(model.url, function (gltf) {
      model.gltf = gltf;
    });
  };

  for (var _i = 0, _Object$values = Object.values(models); _i < _Object$values.length; _i++) {
    _loop2();
  }

  function manageAnimation() {
    var _loop = function _loop() {
      var model = _Object$values2[_i2];
      model.animationClip = {};
      model.gltf.animations.forEach(function (value, index) {
        model.animationClip[value.name] = model.gltf.animations[index];
      });
    };

    for (var _i2 = 0, _Object$values2 = Object.values(models); _i2 < _Object$values2.length; _i2++) {
      _loop();
    }
  }
}

main();
//# sourceMappingURL=client2.dev.js.map
