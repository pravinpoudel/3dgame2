import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js";
import { SkeletonUtils } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/utils/SkeletonUtils.js";

function main() {
  const canvas = document.getElementById("main-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#aaaaaa");

  const ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(0, 200, 100);
  scene.add(dirLight);

  const windowsWidth = window.innerWidth;
  const windowsHeight = window.innerHeight;

  const aspect = windowsWidth / windowsHeight;
  let camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 40000);
  camera.position.set(0, 1.5, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.update();

  const globalValues = {
    time:0,
    deltaTime:0
  }

  const manager = new THREE.LoadingManager();
  manager.onLoad = init;

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

// this is logic of @gregman to store the added and removed gameobject
// in queue rather than updating at the same instance to avoid runtime crash

  class WorldObjectManger {
    constructor() {
      this.gameObjects = [];
      this.removeQueque = {};
      this.addQueque = [];
    }
    createGameObject(parentObject, name) {
      this.gameObject = new GameObject(parentObject, name);
      this.gameObjects.push(this.gameObject);
      return this.gameObject;
    }

    removeGameObject(gameObject) {
      this.removeQueque.add(gameObject);
    }

    updateQueue(){
      if(this.removeQueque.length >0){
        // logic to remove an element, need efficient way to remove an object by comparing
        this.removeQueque = [];
      }
      if(this.addQueque.length>0){
        this.gameObjects.push(...this.addQueque);
        this.addQueque = [];
      }
    }

    update() {
      this.updateQueue();
      this.gameObjects.forEach((gameObject)=>{
        gameObject.update();
      });

    }
  }

  const worldObjectManager = new WorldObjectManger();

  const generateHash = (string) => {
    var hash = 0;
    if (string.length == 0) return hash;
    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  };

  class GameObject {
    constructor(parent, objectName) {
      this.name = objectName;
      this.components = new Array();
      this.objectRoot = new THREE.Object3D();
      parent.add(this.objectRoot);
    }

    addComp(ComponentName, ...args) {
      // create component in advance and pass
      // if (!component.componentID) {
      //   console.warn("this is not an instance of component");
      //   return this;
      // }
      // component.entity = this;
      // this.componenets[componentName] = component;
      // return this;

      const component = new ComponentName(this, ...args);
      console.log(component)
      this.components.push(component);
      return component;
    }

    getComponent() {}

    removeComponent() {}

    update() {
      this.components.forEach((component) => {
        component.update();
      });
    }
  }

  class Component {
    constructor(entity) {
      this.gameObject = entity;
    }

    update(){
    }
  }

  class SkinInstance extends Component {
    constructor(entity, model) {
      super(entity);
      this.model = model;
      this.clonedScene = SkeletonUtils.clone(this.model.gltf.scene);
      entity.objectRoot.add(this.clonedScene);
      this.mixer = new THREE.AnimationMixer(this.clonedScene);
      this.actions = {};
    }
    setActiveAnimation(animationName) {
      const animationClip = this.model.animationClip[animationName];
      if (!animationClip) {
        console.warn("desired animation clip is not found in animations list");
        return;
      }
     
      Object.values(this.actions).forEach((action) => {
        action.enabled = false;
      });
      const action = this.mixer.clipAction(animationClip);
      this.actions[animationName] = action;
      action.enabled = true;
      action.reset();
      action.play();
    }
    
  }

  class Player extends Component{
    constructor(entity){
      super(entity);
      this.modelData = models.knight;
      this.modelSkinedInstance = new SkinInstance(entity, this.modelData);
      this.modelSkinedInstance.setActiveAnimation("Run")
    }
    update() {
      // globalValues.deltaTime = 0.00578;
      this.modelSkinedInstance.mixer.update(globalValues.deltaTime);
      // console.log(this.modelSkinedInstance.mixer)
    }  
  }

  const gameObjectManager = new WorldObjectManger();

  function init() {
    console.log("all loaded")
    manageAnimation();
    const playerObject = gameObjectManager.createGameObject(scene, 'player');
    playerObject.addComp(Player);
  }
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function draw(now){
    if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    }

    gameObjectManager.update();
    renderer.render(scene, camera)
    requestAnimationFrame(draw);

  }
  requestAnimationFrame(draw);

}

main();
