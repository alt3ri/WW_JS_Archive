"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ThrowCfg = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_throw_motion_js_1 = require("../fb-component/union-throw-motion.js");
class ThrowCfg {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsThrowCfg(t, o) {
    return (o || new ThrowCfg()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsThrowCfg(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new ThrowCfg()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  motionConfigType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_throw_motion_js_1.UnionThrowMotion.NONE;
  }
  motionConfig(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o ? this.bb.__union(t, this.bb_pos + o) : void 0;
  }
  static startThrowCfg(t) {
    t.startObject(2);
  }
  static addMotionConfigType(t, o) {
    t.addFieldInt8(0, o, union_throw_motion_js_1.UnionThrowMotion.NONE);
  }
  static addMotionConfig(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static endThrowCfg(t) {
    return t.endObject();
  }
  static createThrowCfg(t, o, r) {
    return (
      ThrowCfg.startThrowCfg(t),
      ThrowCfg.addMotionConfigType(t, o),
      ThrowCfg.addMotionConfig(t, r),
      ThrowCfg.endThrowCfg(t)
    );
  }
}
exports.ThrowCfg = ThrowCfg;
//# sourceMappingURL=throw-cfg.js.map
