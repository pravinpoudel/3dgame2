"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var manager = new THREE.LoadingManager();
manager.onLoad = initialize;
var models = {
  boy: {
    url: "https://threejsfundamentals.org/threejs/resources/models/knight/KnightCharacter.gltf"
  }
};

var LoadModel =
/*#__PURE__*/
function () {
  function LoadModel(models) {
    _classCallCheck(this, LoadModel);

    var gltfLoader = new GLTFLoader(manager);

    var _loop = function _loop() {
      var model = _Object$values[_i];
      gltfLoader.load(model.url, function (gltf) {
        model.gltf = gltf;
      });
    };

    for (var _i = 0, _Object$values = Object.values(models); _i < _Object$values.length; _i++) {
      _loop();
    }
  }

  _createClass(LoadModel, [{
    key: "manageAnimation",
    value: function manageAnimation() {
      var _loop2 = function _loop2() {
        var model = _Object$values2[_i2];
        model.animationClip = {};
        model.gltf.animations.forEach(function (value, index) {
          model.animationClip[value.name] = model.gltf.animations[index];
        });
      };

      for (var _i2 = 0, _Object$values2 = Object.values(models); _i2 < _Object$values2.length; _i2++) {
        _loop2();
      }
    }
  }]);

  return LoadModel;
}();
//# sourceMappingURL=animationManager.dev.js.map
