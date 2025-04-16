"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetJigsawFoundation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_set_jigsaw_foundation_js_1 = require("../fb-action/union-set-jigsaw-foundation.js");
class SetJigsawFoundation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSetJigsawFoundation(t, i) {
    return (i || new SetJigsawFoundation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetJigsawFoundation(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SetJigsawFoundation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_set_jigsaw_foundation_js_1.UnionSetJigsawFoundation.NONE;
  }
  config(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startSetJigsawFoundation(t) {
    t.startObject(2);
  }
  static addConfigType(t, i) {
    t.addFieldInt8(
      0,
      i,
      union_set_jigsaw_foundation_js_1.UnionSetJigsawFoundation.NONE,
    );
  }
  static addConfig(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endSetJigsawFoundation(t) {
    return t.endObject();
  }
  static createSetJigsawFoundation(t, i, s) {
    return (
      SetJigsawFoundation.startSetJigsawFoundation(t),
      SetJigsawFoundation.addConfigType(t, i),
      SetJigsawFoundation.addConfig(t, s),
      SetJigsawFoundation.endSetJigsawFoundation(t)
    );
  }
}
exports.SetJigsawFoundation = SetJigsawFoundation;
//# sourceMappingURL=set-jigsaw-foundation.js.map
