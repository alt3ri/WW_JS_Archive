"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TransformValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  pos_and_rot_js_1 = require("../fb-var/pos-and-rot.js");
class TransformValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(r, s) {
    return (this.bb_pos = r), (this.bb = s), this;
  }
  static getRootAsTransformValue(r, s) {
    return (s || new TransformValue()).__init(
      r.readInt32(r.position()) + r.position(),
      r,
    );
  }
  static getSizePrefixedRootAsTransformValue(r, s) {
    return (
      r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new TransformValue()).__init(
        r.readInt32(r.position()) + r.position(),
        r,
      )
    );
  }
  v(r) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s
      ? (r || new pos_and_rot_js_1.PosAndRot()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startTransformValue(r) {
    r.startObject(1);
  }
  static addV(r, s) {
    r.addFieldOffset(0, s, 0);
  }
  static endTransformValue(r) {
    return r.endObject();
  }
  static createTransformValue(r, s) {
    return (
      TransformValue.startTransformValue(r),
      TransformValue.addV(r, s),
      TransformValue.endTransformValue(r)
    );
  }
}
exports.TransformValue = TransformValue;
//# sourceMappingURL=transform-value.js.map
