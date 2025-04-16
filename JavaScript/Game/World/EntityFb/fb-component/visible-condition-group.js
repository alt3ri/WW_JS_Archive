"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisibleConditionGroup = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VisibleConditionGroup {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsVisibleConditionGroup(i, t) {
    return (t || new VisibleConditionGroup()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsVisibleConditionGroup(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new VisibleConditionGroup()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  conditionsType(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb.__vector(this.bb_pos + t) + i) : 0;
  }
  conditionsTypeLength() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
  }
  conditionsTypeArray() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + i),
          this.bb.__vector_len(this.bb_pos + i),
        )
      : void 0;
  }
  conditions(i, t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? this.bb.__union(t, this.bb.__vector(this.bb_pos + s) + 4 * i)
      : void 0;
  }
  conditionsLength() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
  }
  static startVisibleConditionGroup(i) {
    i.startObject(2);
  }
  static addConditionsType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static createConditionsTypeVector(t, s) {
    t.startVector(1, s.length, 1);
    for (let i = s.length - 1; 0 <= i; i--) t.addInt8(s[i]);
    return t.endVector();
  }
  static startConditionsTypeVector(i, t) {
    i.startVector(1, t, 1);
  }
  static addConditions(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static createConditionsVector(t, s) {
    t.startVector(4, s.length, 4);
    for (let i = s.length - 1; 0 <= i; i--) t.addOffset(s[i]);
    return t.endVector();
  }
  static startConditionsVector(i, t) {
    i.startVector(4, t, 4);
  }
  static endVisibleConditionGroup(i) {
    return i.endObject();
  }
  static createVisibleConditionGroup(i, t, s) {
    return (
      VisibleConditionGroup.startVisibleConditionGroup(i),
      VisibleConditionGroup.addConditionsType(i, t),
      VisibleConditionGroup.addConditions(i, s),
      VisibleConditionGroup.endVisibleConditionGroup(i)
    );
  }
}
exports.VisibleConditionGroup = VisibleConditionGroup;
//# sourceMappingURL=visible-condition-group.js.map
