"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreateStageConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  create_bullet_config_js_1 = require("../fb-component/create-bullet-config.js");
class CreateStageConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCreateStageConfig(t, e) {
    return (e || new CreateStageConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCreateStageConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CreateStageConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  performDuration() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  bulletConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new create_bullet_config_js_1.CreateBulletConfig()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  actions(t, e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (e || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startCreateStageConfig(t) {
    t.startObject(3);
  }
  static addPerformDuration(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static addBulletConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addActions(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createActionsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startActionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endCreateStageConfig(t) {
    return t.endObject();
  }
}
exports.CreateStageConfig = CreateStageConfig;
//# sourceMappingURL=create-stage-config.js.map
