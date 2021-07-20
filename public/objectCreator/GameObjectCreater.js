import Player from "/animation/Player.js";

class GameObjectCreater{
    constructor(typeOfClass, ...args){
        let url = args[0];
        let loader = args[1]
        this.object = new typeOfClass(url, loader);
    }
}

export default GameObjectCreater;