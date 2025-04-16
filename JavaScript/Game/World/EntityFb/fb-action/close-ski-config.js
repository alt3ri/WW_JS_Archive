"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CloseSkiConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class CloseSkiConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCloseSkiConfig(t, i) {
    return (i || new CloseSkiConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCloseSkiConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CloseSkiConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  target(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startCloseSkiConfig(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTargetType(t, i) {
    t.addFieldInt8(1, i, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTarget(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endCloseSkiConfig(t) {
    return t.endObject();
  }
  static createCloseSkiConfig(t, i, e, s) {
    return (
      CloseSkiConfig.startCloseSkiConfig(t),
      CloseSkiConfig.addType(t, i),
      CloseSkiConfig.addTargetType(t, e),
      CloseSkiConfig.addTarget(t, s),
      CloseSkiConfig.endCloseSkiConfig(t)
    );
  }
}
exports.CloseSkiConfig = CloseSkiConfig;
//# sourceMappingURL=close-ski-config.js.map
