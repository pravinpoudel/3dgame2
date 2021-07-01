class GameEngine {
  constructor(scene, renderer, camera){
    this.scene = scene
    this.renderer = renderer
    this.camera = camera
  }

  run() {
    this.runGameLoop()
  }

  runGameLoop() {
    this.updateGame()
    this.updatePhysics()
    this.render()
    requestAnimationFrame(() => this.runGameLoop());
  }

  updateGame() {}

  updatePhysics() {}

  render() {
    this.renderer.render(this.scene.scene, this.camera)
  }
}

class Scene {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.gameObjects = []
    this.createScene()
  }

  createScene() {
    this.scene = new THREE.Scene();
  }

  addSkyBox(skybox) {
    this.scene.background = skybox.cubeTexture;
  }

  addGameObject(gameObject) {
    this.scene.add(gameObject)
    this.gameObjects.push(gameObject)
  }
}

class Renderer {
  constructor(width, height) {
    this.createRenderer()
    this.setupSize(width, height)
    this.enableShadowMap()
    this.addToDocument()
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
    this.cubeTexture = new THREE.CubeTextureLoader()
    .setPath(path)
    .load(images);
  }
}

const windowsWidth = window.innerWidth;
const windowsHeight = window.innerHeight;


function addSkyBoxToScene(scene) {
  let path = "images/skybox1/greenery/"
  let images = [
    "meadow_ft.jpg",
    "meadow_bk.jpg",
    "meadow_up.jpg",
    "meadow_dn.jpg",
    "meadow_rt.jpg",
    "meadow_lf.jpg",
  ]
  let skybox = new Skybox(path, images)
  scene.addSkyBox(skybox)
}

function addHemiLight(scene) {
  const hemiLight = new THREE.HemisphereLight(0xffff33, 0x5b573d, 2.5);
  scene.addGameObject(hemiLight);
}

function addSpotLight(scene) {
  const spotLight1 = new THREE.SpotLight(0xffffff, 3);
  spotLight1.castShadow = true;
  spotLight1.shadow.bias = -0.0001;
  spotLight1.shadow.mapSize.width = 4096;
  spotLight1.shadow.mapSize.height = 4096;
  scene.addGameObject(spotLight1);
}

function addLightToScene(scene) {
  addHemiLight(scene)
  addSpotLight(scene)
}

function createCamera() {
  const aspect = windowsWidth / windowsHeight;
  let camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 40000);
  camera.position.set(-3000, 200, 1000);

  return camera
}

function setupCameraControl(camera, renderer) {
  let control = new THREE.OrbitControls(camera, renderer.renderer.domElement);
  control.update();
}

function addModelToScene(scene) {
  new THREE.GLTFLoader().load("models/iguana/scene.gltf", (result) => {
    let model = result.scene.children[0];
    model.position.set(100.0, 2.0, -3.0);
    model.traverse((object1) => {
      if (object1.isMesh) {
        object1.castShadow = true;
        object1.receiveShadow = true;

        if (object1.material.map) {
          object1.material.map.anisotropy = 16;
        }
      }
    });
    scene.addGameObject(model);
  })
}

function createRenderer() {
  let renderer = new Renderer(windowsWidth, windowsHeight)
  renderer.setupToneMappingWithExposure(2)
  return renderer
}

function createScene() {
  let scene = new Scene(windowsWidth, windowsHeight)
  addLightToScene(scene)
  addSkyBoxToScene(scene)
  addModelToScene(scene)
  return scene
}

function main() {
  let renderer = createRenderer()
  let scene = createScene()
  let camera = createCamera()

  setupCameraControl(camera, renderer)

  let engine = new GameEngine(scene, renderer, camera)
  engine.run()
}

main();