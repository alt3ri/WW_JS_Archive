"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemLifeCycleComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  create_stage_config_js_1 = require("../fb-component/create-stage-config.js"),
  destroy_stage_config_js_1 = require("../fb-component/destroy-stage-config.js");
class SceneItemLifeCycleComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSceneItemLifeCycleComponent(e, t) {
    return (t || new SceneItemLifeCycleComponent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSceneItemLifeCycleComponent(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SceneItemLifeCycleComponent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  createStageConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? (e || new create_stage_config_js_1.CreateStageConfig()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  destroyStageConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? (e || new destroy_stage_config_js_1.DestroyStageConfig()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  static startSceneItemLifeCycleComponent(e) {
    e.startObject(3);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addCreateStageConfig(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addDestroyStageConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endSceneItemLifeCycleComponent(e) {
    return e.endObject();
  }
}
exports.SceneItemLifeCycleComponent = SceneItemLifeCycleComponent;
//# sourceMappingURL=scene-item-life-cycle-component.js.map
