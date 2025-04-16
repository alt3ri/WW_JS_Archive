"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSkiConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class OpenSkiConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsOpenSkiConfig(t, i) {
    return (i || new OpenSkiConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOpenSkiConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new OpenSkiConfig()).__init(
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
  skiConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startOpenSkiConfig(t) {
    t.startObject(4);
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
  static addSkiConfig(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endOpenSkiConfig(t) {
    return t.endObject();
  }
  static createOpenSkiConfig(t, i, e, n, s) {
    return (
      OpenSkiConfig.startOpenSkiConfig(t),
      OpenSkiConfig.addType(t, i),
      OpenSkiConfig.addTargetType(t, e),
      OpenSkiConfig.addTarget(t, n),
      OpenSkiConfig.addSkiConfig(t, s),
      OpenSkiConfig.endOpenSkiConfig(t)
    );
  }
}
exports.OpenSkiConfig = OpenSkiConfig;
//# sourceMappingURL=open-ski-config.js.map
