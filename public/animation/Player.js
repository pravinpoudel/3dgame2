
class Player {  
  constructor(url, loader) {
    let self = this;
    loader.load(url, (gltf)=>{
    self.gltf = gltf;
    });
  }
}

export default Player;
