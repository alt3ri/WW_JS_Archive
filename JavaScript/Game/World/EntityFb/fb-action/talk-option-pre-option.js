"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkOptionPreOption = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkOptionPreOption {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsTalkOptionPreOption(t, i) {
    return (i || new TalkOptionPreOption()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTalkOptionPreOption(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new TalkOptionPreOption()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  preOptions(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  preOptionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  preOptionsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startTalkOptionPreOption(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPreOptions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createPreOptionsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) i.addInt32(r[t]);
    return i.endVector();
  }
  static startPreOptionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endTalkOptionPreOption(t) {
    return t.endObject();
  }
  static createTalkOptionPreOption(t, i, r) {
    return (
      TalkOptionPreOption.startTalkOptionPreOption(t),
      TalkOptionPreOption.addType(t, i),
      TalkOptionPreOption.addPreOptions(t, r),
      TalkOptionPreOption.endTalkOptionPreOption(t)
    );
  }
}
exports.TalkOptionPreOption = TalkOptionPreOption;
//# sourceMappingURL=talk-option-pre-option.js.map
