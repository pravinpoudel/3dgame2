"use strict";

var THREE = _interopRequireWildcard(require("https://cdn.skypack.dev/three@0.128.0/build/three.module.js"));

var _OrbitControls = require("https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js");

var _GLTFLoader = require("https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

  var WorldObjectManger =
  /*#__PURE__*/
  function () {
    function WorldObjectManger() {
      _classCallCheck(this, WorldObjectManger);

      this.gameObjects = [];
    }

    _createClass(WorldObjectManger, [{
      key: "createGameObject",
      value: function createGameObject() {}
    }, {
      key: "removeGameObject",
      value: function removeGameObject() {}
    }, {
      key: "update",
      value: function update() {}
    }]);

    return WorldObjectManger;
  }();

  var worldObjectManager = new WorldObjectManger();

  var generateHash = function generateHash(string) {
    var hash = 0;
    if (string.length == 0) return hash;

    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    return hash;
  };

  var GameObject =
  /*#__PURE__*/
  function () {
    function GameObject(parent, objectName) {
      _classCallCheck(this, GameObject);

      this.name = objectName;
      this.components = new Array();
      this.objectRoot = new THREE.Object3D();
      parent.add(this.objectRoot);
    }

    _createClass(GameObject, [{
      key: "addComp",
      value: function addComp(ComponentName) {
        // create component in advance and pass
        // if (!component.componentID) {
        //   console.warn("this is not an instance of component");
        //   return this;
        // }
        // component.entity = this;
        // this.componenets[componentName] = component;
        // return this;
        var component = _construct(ComponentName, [this].concat(_toConsumableArray(args)));

        this.components.push(component);
        return component;
      }
    }, {
      key: "getComponent",
      value: function getComponent() {}
    }, {
      key: "removeComponent",
      value: function removeComponent() {}
    }, {
      key: "update",
      value: function update() {
        this.components.forEach(function (component) {
          component.update();
        });
      }
    }]);

    return GameObject;
  }();

  var Component = function Component(entity) {
    _classCallCheck(this, Component);

    this.componentID = generateHash(string);
    this.gameObject = entity;
  };

  var SkinInstance =
  /*#__PURE__*/
  function (_Component) {
    _inherits(SkinInstance, _Component);

    function SkinInstance(entity, model) {
      var _this;

      _classCallCheck(this, SkinInstance);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SkinInstance).call(this, entity));
      _this.model = model;
      _this.clonedScene = SkeletonUtils.clone(_this.model.gltf.scene);
      _this.mixter = new THREE.AnimationMixter(_this.clonedScene);
      entity.objectRoot.add(_this.clonedScene);
      _this.actions = {};
      return _this;
    }

    _createClass(SkinInstance, [{
      key: "setActiveAnimation",
      value: function setActiveAnimation(animationName) {
        var animationClip = this.model.animations[animationName];

        if (!animationClip) {
          console.warn("desired animation clip is not found in animations list");
          return;
        }

        var action = this.mixter.clipAction(animationClip);
        this.actions[animationName] = action;
        Object.values(actions).forEach(function (action) {
          action.enabled = false;
        });
        action.enabled = true;
        action.reset();
        action.play();
      }
    }, {
      key: "update",
      value: function update() {
        this.mixter.update(timeUpdate);
      }
    }]);

    return SkinInstance;
  }(Component);

  function init() {
    manageAnimation();
    var gameObject = new WorldObjectManger();
  }
}

main();
//# sourceMappingURL=client2.dev.js.map
