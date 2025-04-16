"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.IgnoresCollisionCfg = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  actor_ref_js_1 = require("../fb-actor/actor-ref.js");
class IgnoresCollisionCfg {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsIgnoresCollisionCfg(t, s) {
    return (s || new IgnoresCollisionCfg()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsIgnoresCollisionCfg(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new IgnoresCollisionCfg()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  ignoreEntitys(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.readInt32(this.bb.__vector(this.bb_pos + s) + 4 * t) : 0;
  }
  ignoreEntitysLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  ignoreEntitysArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  ignoreActors(t, s) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r
      ? (s || new actor_ref_js_1.ActorRef()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  ignoreActorsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startIgnoresCollisionCfg(t) {
    t.startObject(2);
  }
  static addIgnoreEntitys(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static createIgnoreEntitysVector(s, r) {
    s.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) s.addInt32(r[t]);
    return s.endVector();
  }
  static startIgnoreEntitysVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addIgnoreActors(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createIgnoreActorsVector(s, r) {
    s.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) s.addOffset(r[t]);
    return s.endVector();
  }
  static startIgnoreActorsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endIgnoresCollisionCfg(t) {
    return t.endObject();
  }
  static createIgnoresCollisionCfg(t, s, r) {
    return (
      IgnoresCollisionCfg.startIgnoresCollisionCfg(t),
      IgnoresCollisionCfg.addIgnoreEntitys(t, s),
      IgnoresCollisionCfg.addIgnoreActors(t, r),
      IgnoresCollisionCfg.endIgnoresCollisionCfg(t)
    );
  }
}
exports.IgnoresCollisionCfg = IgnoresCollisionCfg;
//# sourceMappingURL=ignores-collision-cfg.js.map
