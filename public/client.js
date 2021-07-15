class GameEngine {
  constructor(scene, renderer, camera) {
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
  }

  run() {
    this.runGameLoop();
  }

  runGameLoop() {
    this.updateGame();
    this.updatePhysics();
    this.render();
    requestAnimationFrame(() => this.runGameLoop());
  }

  updateGame() {
    this.scene.update();
  }

  updatePhysics() {}

  render() {
    this.renderer.render(this.scene.scene, this.camera);
  }
}

class Scene {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameObjects = [];
    this.createScene();
  }

  createScene() {
    this.scene = new THREE.Scene();
  }

  addSkyBox(skybox) {
    this.scene.background = skybox.cubeTexture;
  }

  addLight(light) {
    this.scene.add(light);
  }

  addGameObject(gameObject) {
    this.scene.add(gameObject.model);
    this.gameObjects.push(gameObject);
  }

  update() {
    this.gameObjects.forEach((gameObject) => {
      gameObject.update();
    });
  }
}

class Renderer {
  constructor(width, height) {
    this.createRenderer();
    this.setupSize(width, height);
    this.enableShadowMap();
    this.addToDocument();
  }

  setupSize(width, height) {
    this.renderer.setSize(width, height);
  }

  enableShadowMap() {
    this.renderer.shadowMap.enabled = true;
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
  }

  addToDocument() {
    document.body.appendChild(this.renderer.domElement);
  }

  setupToneMappingWithExposure(exposure) {
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = exposure;
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }
}

class Skybox {
  constructor(path, images) {
    this.cubeTexture = new THREE.CubeTextureLoader().setPath(path).load(images);
  }
}

class GameObject {
  constructor(model) {
    this.model = model;
  }

  update() {}
}

class Car extends GameObject {
  constructor(model) {
    super(model);
    this.speed = 1;
    this.direction = { x: 0, y: 0, z: 0 };
    this.angle = { z: 0 };
  }

  update() {
    this.model.translateOnAxis(this.direction, this.speed);
    this.model.rotation.z = this.angle.z;
  }
}

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
  camera.position.set(4, 4, 20);

  return camera;
}

function setupCameraControl(camera, renderer) {
  let control = new THREE.OrbitControls(camera, renderer.renderer.domElement);
  control.update();
}

function addModelToScene(scene) {
  new THREE.GLTFLoader().load("models/house/scene.gltf", (result) => {
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

class CarInputController {
  constructor(car) {
    this.mouseSensitivity = 200;
    this.car = car;
    let k = new KeyboardInputHandler((key, state) =>
      this.listenKeyEvent(key, state)
    );
    let m = new MouseInputHandler((x, y) => this.listenMouseMovement(x, y));
  }

  listenMouseMovement(x, y) {
    this.car.angle.z += x / this.mouseSensitivity;
  }

  moveLeft(state) {
    if (state == KeyState.DOWN) {
      this.car.direction.x = -1;
    } else if (this.car.direction.x == -1) {
      this.car.direction.x = 0;
    }
  }

  moveRight(state) {
    if (state == KeyState.DOWN) {
      this.car.direction.x = 1;
    } else if (this.car.direction.x == 1) {
      this.car.direction.x = 0;
    }
  }

  moveDown(state) {
    if (state == KeyState.DOWN) {
      this.car.direction.y = 1;
    } else if (this.car.direction.y == 1) {
      this.car.direction.y = 0;
    }
  }

  moveUp(state) {
    if (state == KeyState.DOWN) {
      this.car.direction.y = -1;
    } else if (this.car.direction.y == -1) {
      this.car.direction.y = 0;
    }
  }

  listenKeyEvent(key, state) {
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
}

class MouseInputHandler {
  constructor(listener) {
    this.listener = listener;
    this.setupMouseMoveListener();
    this.lockPointer();
  }

  setupMouseMoveListener() {
    let self = this;
    document.onmousemove = function (mouseEvent) {
      self.listener(mouseEvent.movementX, mouseEvent.movementY);
    };
  }

  lockPointer() {
    document.onmousedown = function () {
      document.body.requestPointerLock();
    };
  }
}

const Keys = {
  LEFT: "a",
  RIGHT: "d",
  UP: "w",
  DOWN: "s",
};

const KeyState = {
  UP: 0,
  DOWN: 1,
};

class KeyboardInputHandler {
  constructor(listener) {
    this.listner = listener;
    this.setupKeyUpListener();
    this.setupKeyDownListener();
  }

  setupKeyUpListener() {
    let self = this;
    document.onkeyup = function (keyEvent) {
      self.listner(keyEvent.key, KeyState.UP);
    };
  }

  setupKeyDownListener() {
    let self = this;
    document.onkeydown = function (keyEvent) {
      self.listner(keyEvent.key, KeyState.DOWN);
    };
  }
}

function main() {
  let renderer = createRenderer();
  let scene = createScene();
  let camera = createCamera();

  setupCameraControl(camera, renderer);

  let engine = new GameEngine(scene, renderer, camera);
  engine.run();
}

main();
