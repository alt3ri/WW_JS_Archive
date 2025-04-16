"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideTrigger = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GuideTrigger {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsGuideTrigger(t, i) {
    return (i || new GuideTrigger()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGuideTrigger(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new GuideTrigger()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  conditionsExtType(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  conditionsExtTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  conditionsExtTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  conditionsType(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  conditionsTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  conditionsTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  conditions(t, i) {
    var r = this.bb.__offset(this.bb_pos, 10);
    return r
      ? this.bb.__union(i, this.bb.__vector(this.bb_pos + r) + 4 * t)
      : void 0;
  }
  conditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  guideId() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startGuideTrigger(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addConditionsExtType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createConditionsExtTypeVector(i, r) {
    i.startVector(1, r.length, 1);
    for (let t = r.length - 1; 0 <= t; t--) i.addInt8(r[t]);
    return i.endVector();
  }
  static startConditionsExtTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addConditionsType(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createConditionsTypeVector(i, r) {
    i.startVector(1, r.length, 1);
    for (let t = r.length - 1; 0 <= t; t--) i.addInt8(r[t]);
    return i.endVector();
  }
  static startConditionsTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addConditions(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createConditionsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) i.addOffset(r[t]);
    return i.endVector();
  }
  static startConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addGuideId(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static endGuideTrigger(t) {
    return t.endObject();
  }
  static createGuideTrigger(t, i, r, e, s, n) {
    return (
      GuideTrigger.startGuideTrigger(t),
      GuideTrigger.addType(t, i),
      GuideTrigger.addConditionsExtType(t, r),
      GuideTrigger.addConditionsType(t, e),
      GuideTrigger.addConditions(t, s),
      GuideTrigger.addGuideId(t, n),
      GuideTrigger.endGuideTrigger(t)
    );
  }
}
exports.GuideTrigger = GuideTrigger;
//# sourceMappingURL=guide-trigger.js.map
