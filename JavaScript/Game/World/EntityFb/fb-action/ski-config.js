"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkiConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_ski_config_js_1 = require("../fb-action/union-ski-config.js");
class SkiConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsSkiConfig(i, t) {
    return (t || new SkiConfig()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsSkiConfig(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SkiConfig()).__init(i.readInt32(i.position()) + i.position(), i)
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  configType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? this.bb.readUint8(this.bb_pos + i)
      : union_ski_config_js_1.UnionSkiConfig.NONE;
  }
  config(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(i, this.bb_pos + t) : void 0;
  }
  static startSkiConfig(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addConfigType(i, t) {
    i.addFieldInt8(1, t, union_ski_config_js_1.UnionSkiConfig.NONE);
  }
  static addConfig(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endSkiConfig(i) {
    return i.endObject();
  }
  static createSkiConfig(i, t, s, n) {
    return (
      SkiConfig.startSkiConfig(i),
      SkiConfig.addType(i, t),
      SkiConfig.addConfigType(i, s),
      SkiConfig.addConfig(i, n),
      SkiConfig.endSkiConfig(i)
    );
  }
}
exports.SkiConfig = SkiConfig;
//# sourceMappingURL=ski-config.js.map
