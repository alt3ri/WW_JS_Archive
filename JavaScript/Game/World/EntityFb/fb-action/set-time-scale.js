"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetTimeScale = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_set_time_scale_js_1 = require("../fb-action/union-set-time-scale.js");
class SetTimeScale {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSetTimeScale(e, t) {
    return (t || new SetTimeScale()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSetTimeScale(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SetTimeScale()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  configType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_set_time_scale_js_1.UnionSetTimeScale.NONE;
  }
  config(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startSetTimeScale(e) {
    e.startObject(2);
  }
  static addConfigType(e, t) {
    e.addFieldInt8(0, t, union_set_time_scale_js_1.UnionSetTimeScale.NONE);
  }
  static addConfig(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endSetTimeScale(e) {
    return e.endObject();
  }
  static createSetTimeScale(e, t, i) {
    return (
      SetTimeScale.startSetTimeScale(e),
      SetTimeScale.addConfigType(e, t),
      SetTimeScale.addConfig(e, i),
      SetTimeScale.endSetTimeScale(e)
    );
  }
}
exports.SetTimeScale = SetTimeScale;
//# sourceMappingURL=set-time-scale.js.map
