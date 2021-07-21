export default class CarCreator {
  constructor(url, loader){
    this.url = url
    this.loader = loader
    this.gltf = null
  }

  loadModelFromUrl(onLoad) {
    let self = this
    this.loader.load(this.url, (gltf) => {
      self.gltf = gltf
      onLoad()
    })
  }

  getCar() {
    if(this.gltf != null) {
      let car = new Car(this.gltf)
      return car
    }
  }
}
