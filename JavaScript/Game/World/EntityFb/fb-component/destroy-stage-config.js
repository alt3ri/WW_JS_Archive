"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DestroyStageConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class DestroyStageConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDestroyStageConfig(t, e) {
    return (e || new DestroyStageConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDestroyStageConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DestroyStageConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  performDuration() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
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
  static startDestroyStageConfig(t) {
    t.startObject(3);
  }
  static addPerformDuration(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static addBulletId(t, e) {
    t.addFieldInt64(1, e, BigInt("0"));
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
  static endDestroyStageConfig(t) {
    return t.endObject();
  }
  static createDestroyStageConfig(t, e, i, s) {
    return (
      DestroyStageConfig.startDestroyStageConfig(t),
      DestroyStageConfig.addPerformDuration(t, e),
      DestroyStageConfig.addBulletId(t, i),
      DestroyStageConfig.addActions(t, s),
      DestroyStageConfig.endDestroyStageConfig(t)
    );
  }
}
exports.DestroyStageConfig = DestroyStageConfig;
//# sourceMappingURL=destroy-stage-config.js.map
