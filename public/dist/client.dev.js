"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameEngine =
/*#__PURE__*/
function () {
  function GameEngine(scene, renderer, camera) {
    _classCallCheck(this, GameEngine);

    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
  }

  _createClass(GameEngine, [{
    key: "run",
    value: function run() {
      this.runGameLoop();
    }
  }, {
    key: "runGameLoop",
    value: function runGameLoop() {
      var _this = this;

      this.updateGame();
      this.updatePhysics();
      this.render();
      requestAnimationFrame(function () {
        return _this.runGameLoop();
      });
    }
  }, {
    key: "updateGame",
    value: function updateGame() {
      this.scene.update();
    }
  }, {
    key: "updatePhysics",
    value: function updatePhysics() {}
  }, {
    key: "render",
    value: function render() {
      this.renderer.render(this.scene.scene, this.camera);
    }
  }]);

  return GameEngine;
}();

var Scene =
/*#__PURE__*/
function () {
  function Scene(width, height) {
    _classCallCheck(this, Scene);

    this.width = width;
    this.height = height;
    this.gameObjects = [];
    this.createScene();
  }

  _createClass(Scene, [{
    key: "createScene",
    value: function createScene() {
      this.scene = new THREE.Scene();
    }
  }, {
    key: "addSkyBox",
    value: function addSkyBox(skybox) {
      this.scene.background = skybox.cubeTexture;
    }
  }, {
    key: "addLight",
    value: function addLight(light) {
      this.scene.add(light);
    }
  }, {
    key: "addGameObject",
    value: function addGameObject(gameObject) {
      this.scene.add(gameObject.model);
      this.gameObjects.push(gameObject);
    }
  }, {
    key: "update",
    value: function update() {
      this.gameObjects.forEach(function (gameObject) {
        gameObject.update();
      });
    }
  }]);

  return Scene;
}();

var Renderer =
/*#__PURE__*/
function () {
  function Renderer(width, height) {
    _classCallCheck(this, Renderer);

    this.createRenderer();
    this.setupSize(width, height);
    this.enableShadowMap();
    this.addToDocument();
  }

  _createClass(Renderer, [{
    key: "setupSize",
    value: function setupSize(width, height) {
      this.renderer.setSize(width, height);
    }
  }, {
    key: "enableShadowMap",
    value: function enableShadowMap() {
      this.renderer.shadowMap.enabled = true;
    }
  }, {
    key: "createRenderer",
    value: function createRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
    }
  }, {
    key: "addToDocument",
    value: function addToDocument() {
      document.body.appendChild(this.renderer.domElement);
    }
  }, {
    key: "setupToneMappingWithExposure",
    value: function setupToneMappingWithExposure(exposure) {
      this.renderer.toneMapping = THREE.ReinhardToneMapping;
      this.renderer.toneMappingExposure = exposure;
    }
  }, {
    key: "render",
    value: function render(scene, camera) {
      this.renderer.render(scene, camera);
    }
  }]);

  return Renderer;
}();

var Skybox = function Skybox(path, images) {
  _classCallCheck(this, Skybox);

  this.cubeTexture = new THREE.CubeTextureLoader().setPath(path).load(images);
};

var GameObject =
/*#__PURE__*/
function () {
  function GameObject(model) {
    _classCallCheck(this, GameObject);

    this.model = model;
  }

  _createClass(GameObject, [{
    key: "update",
    value: function update() {}
  }]);

  return GameObject;
}();

var Car =
/*#__PURE__*/
function (_GameObject) {
  _inherits(Car, _GameObject);

  function Car(model) {
    var _this2;

    _classCallCheck(this, Car);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Car).call(this, model));
    _this2.speed = 1;
    _this2.direction = {
      x: 0,
      y: 0,
      z: 0
    };
    _this2.angle = {
      z: 0
    };
    return _this2;
  }

  _createClass(Car, [{
    key: "update",
    value: function update() {
      this.model.translateOnAxis(this.direction, this.speed);
      this.model.rotation.z = this.angle.z;
    }
  }]);

  return Car;
}(GameObject);

var windowsWidth = window.innerWidth;
var windowsHeight = window.innerHeight;

function addSkyBoxToScene(scene) {
  var path = "images/skybox1/greenery/";
  var images = ["meadow_ft.jpg", "meadow_bk.jpg", "meadow_up.jpg", "meadow_dn.jpg", "meadow_rt.jpg", "meadow_lf.jpg"];
  var skybox = new Skybox(path, images);
  scene.addSkyBox(skybox);
}

function addHemiLight(scene) {
  var hemiLight = new THREE.HemisphereLight(0xffff33, 0x5b573d, 2.5);
  scene.addLight(hemiLight);
}

function addSpotLight(scene) {
  var spotLight1 = new THREE.SpotLight(0xffffff, 3);
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
  var aspect = windowsWidth / windowsHeight;
  var camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 40000);
  camera.position.set(4, 4, 20);
  return camera;
}

function setupCameraControl(camera, renderer) {
  var control = new THREE.OrbitControls(camera, renderer.renderer.domElement);
  control.update();
}

function addModelToScene(scene) {
  new THREE.GLTFLoader().load("models/house/scene.gltf", function (result) {
    var model = result.scene.children[0];
    model.position.set(0.0, 0.0, 0.0);
    model.traverse(function (object1) {
      if (object1.isMesh) {
        object1.castShadow = true;
        object1.receiveShadow = true;

        if (object1.material.map) {
          object1.material.map.anisotropy = 16;
        }
      }
    });
    var car = new Car(model);
    var controller = new CarInputController(car);
    scene.addGameObject(car);
  });
}

function createRenderer() {
  var renderer = new Renderer(windowsWidth, windowsHeight);
  renderer.setupToneMappingWithExposure(2);
  return renderer;
}

function createScene() {
  var scene = new Scene(windowsWidth, windowsHeight);
  addLightToScene(scene);
  addSkyBoxToScene(scene);
  addModelToScene(scene);
  return scene;
}

var CarInputController =
/*#__PURE__*/
function () {
  function CarInputController(car) {
    var _this3 = this;

    _classCallCheck(this, CarInputController);

    this.mouseSensitivity = 200;
    this.car = car;
    var k = new KeyboardInputHandler(function (key, state) {
      return _this3.listenKeyEvent(key, state);
    });
    var m = new MouseInputHandler(function (x, y) {
      return _this3.listenMouseMovement(x, y);
    });
  }

  _createClass(CarInputController, [{
    key: "listenMouseMovement",
    value: function listenMouseMovement(x, y) {
      this.car.angle.z += x / this.mouseSensitivity;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft(state) {
      if (state == KeyState.DOWN) {
        this.car.direction.x = -1;
      } else if (this.car.direction.x == -1) {
        this.car.direction.x = 0;
      }
    }
  }, {
    key: "moveRight",
    value: function moveRight(state) {
      if (state == KeyState.DOWN) {
        this.car.direction.x = 1;
      } else if (this.car.direction.x == 1) {
        this.car.direction.x = 0;
      }
    }
  }, {
    key: "moveDown",
    value: function moveDown(state) {
      if (state == KeyState.DOWN) {
        this.car.direction.y = 1;
      } else if (this.car.direction.y == 1) {
        this.car.direction.y = 0;
      }
    }
  }, {
    key: "moveUp",
    value: function moveUp(state) {
      if (state == KeyState.DOWN) {
        this.car.direction.y = -1;
      } else if (this.car.direction.y == -1) {
        this.car.direction.y = 0;
      }
    }
  }, {
    key: "listenKeyEvent",
    value: function listenKeyEvent(key, state) {
      if (key == Keys.LEFT) {
        this.moveLeft(state);
      }

      if (key == Keys.DOWN) {
        this.moveDown(state);
      }

      if (key == Keys.RIGHT) {
        this.moveRight(state);
      }

      if (key == Keys.UP) {
        this.moveUp(state);
      }
    }
  }]);

  return CarInputController;
}();

var MouseInputHandler =
/*#__PURE__*/
function () {
  function MouseInputHandler(listener) {
    _classCallCheck(this, MouseInputHandler);

    this.listener = listener;
    this.setupMouseMoveListener();
    this.lockPointer();
  }

  _createClass(MouseInputHandler, [{
    key: "setupMouseMoveListener",
    value: function setupMouseMoveListener() {
      var self = this;

      document.onmousemove = function (mouseEvent) {
        self.listener(mouseEvent.movementX, mouseEvent.movementY);
      };
    }
  }, {
    key: "lockPointer",
    value: function lockPointer() {
      document.onmousedown = function () {
        document.body.requestPointerLock();
      };
    }
  }]);

  return MouseInputHandler;
}();

var Keys = {
  LEFT: "a",
  RIGHT: "d",
  UP: "w",
  DOWN: "s"
};
var KeyState = {
  UP: 0,
  DOWN: 1
};

var KeyboardInputHandler =
/*#__PURE__*/
function () {
  function KeyboardInputHandler(listener) {
    _classCallCheck(this, KeyboardInputHandler);

    this.listner = listener;
    this.setupKeyUpListener();
    this.setupKeyDownListener();
  }

  _createClass(KeyboardInputHandler, [{
    key: "setupKeyUpListener",
    value: function setupKeyUpListener() {
      var self = this;

      document.onkeyup = function (keyEvent) {
        self.listner(keyEvent.key, KeyState.UP);
      };
    }
  }, {
    key: "setupKeyDownListener",
    value: function setupKeyDownListener() {
      var self = this;

      document.onkeydown = function (keyEvent) {
        self.listner(keyEvent.key, KeyState.DOWN);
      };
    }
  }]);

  return KeyboardInputHandler;
}();

function main() {
  var renderer = createRenderer();
  var scene = createScene();
  var camera = createCamera();
  setupCameraControl(camera, renderer);
  var engine = new GameEngine(scene, renderer, camera);
  engine.run();
}

main();
//# sourceMappingURL=client.dev.js.map
