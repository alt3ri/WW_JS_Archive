"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayEffect = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_pos2_js_1 = require("../fb-action/union-pos2.js");
class PlayEffect {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsPlayEffect(t, s) {
    return (s || new PlayEffect()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPlayEffect(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new PlayEffect()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  path(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  pos2Type() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_pos2_js_1.UnionPos2.NONE;
  }
  pos2(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s ? this.bb.__union(t, this.bb_pos + s) : void 0;
  }
  static startPlayEffect(t) {
    t.startObject(3);
  }
  static addPath(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addPos2Type(t, s) {
    t.addFieldInt8(1, s, union_pos2_js_1.UnionPos2.NONE);
  }
  static addPos2(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static endPlayEffect(t) {
    return t.endObject();
  }
  static createPlayEffect(t, s, e, i) {
    return (
      PlayEffect.startPlayEffect(t),
      PlayEffect.addPath(t, s),
      PlayEffect.addPos2Type(t, e),
      PlayEffect.addPos2(t, i),
      PlayEffect.endPlayEffect(t)
    );
  }
}
exports.PlayEffect = PlayEffect;
//# sourceMappingURL=play-effect.js.map
