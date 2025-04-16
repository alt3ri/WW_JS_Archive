"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetGlobalTimeScale = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_set_global_time_scale_js_1 = require("../fb-action/union-set-global-time-scale.js");
class SetGlobalTimeScale {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSetGlobalTimeScale(e, t) {
    return (t || new SetGlobalTimeScale()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSetGlobalTimeScale(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SetGlobalTimeScale()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  configType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_set_global_time_scale_js_1.UnionSetGlobalTimeScale.NONE;
  }
  config(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startSetGlobalTimeScale(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addConfigType(e, t) {
    e.addFieldInt8(
      1,
      t,
      union_set_global_time_scale_js_1.UnionSetGlobalTimeScale.NONE,
    );
  }
  static addConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endSetGlobalTimeScale(e) {
    return e.endObject();
  }
  static createSetGlobalTimeScale(e, t, i, l) {
    return (
      SetGlobalTimeScale.startSetGlobalTimeScale(e),
      SetGlobalTimeScale.addType(e, t),
      SetGlobalTimeScale.addConfigType(e, i),
      SetGlobalTimeScale.addConfig(e, l),
      SetGlobalTimeScale.endSetGlobalTimeScale(e)
    );
  }
}
exports.SetGlobalTimeScale = SetGlobalTimeScale;
//# sourceMappingURL=set-global-time-scale.js.map
