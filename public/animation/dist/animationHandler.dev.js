"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AnimationPlayer =
/*#__PURE__*/
function (_Component) {
  _inherits(AnimationPlayer, _Component);

  function AnimationPlayer(entity, model) {
    var _this;

    _classCallCheck(this, AnimationPlayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AnimationPlayer).call(this, entity));
    _this.model = model;
    _this.clonedScene = SkeletonUtils.clone(_this.model.gltf.scene);
    entity.objectRoot.add(_this.clonedScene);
    _this.mixer = new THREE.AnimationMixer(_this.clonedScene);
    _this.actions = {};
    return _this;
  }

  _createClass(AnimationPlayer, [{
    key: "setActiveAnimation",
    value: function setActiveAnimation(animationName) {
      var animationClip = this.model.animationClip[animationName];

      if (!animationClip) {
        console.warn("desired animation clip is not found in animations list");
        return;
      }

      Object.values(this.actions).forEach(function (action) {
        action.enabled = false;
      });
      var action = this.mixer.clipAction(animationClip);
      this.actions[animationName] = action;
      action.enabled = true; // we are resetting here just to avoid case for the action with completed cycle/loop

      action.reset();
      action.play();
    }
  }]);

  return AnimationPlayer;
}(Component);

var Player =
/*#__PURE__*/
function (_Component2) {
  _inherits(Player, _Component2);

  function Player(entity, model) {
    var _this2;

    _classCallCheck(this, Player);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, entity));
    _this2.modelData = models.boy;
    _this2.modelSkinedInstance = new AnimationPlayer(entity, _this2.modelData);

    _this2.modelSkinedInstance.setActiveAnimation("Run");

    return _this2;
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      this.modelSkinedInstance.mixer.update(globalValues.deltaTime);
    }
  }]);

  return Player;
}(Component);
//# sourceMappingURL=animationHandler.dev.js.map
