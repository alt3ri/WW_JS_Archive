"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HideByRangeInFlow = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class HideByRangeInFlow {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsHideByRangeInFlow(t, s) {
    return (s || new HideByRangeInFlow()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHideByRangeInFlow(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new HideByRangeInFlow()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  center(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  radius() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  entityIds(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s ? this.bb.readInt32(this.bb.__vector(this.bb_pos + s) + 4 * t) : 0;
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  isCleanSimpleNpc() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isCleanPasserByNpc() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startHideByRangeInFlow(t) {
    t.startObject(6);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addCenter(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addRadius(t, s) {
    t.addFieldInt32(2, s, 0);
  }
  static addEntityIds(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static createEntityIdsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) s.addInt32(i[t]);
    return s.endVector();
  }
  static startEntityIdsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addIsCleanSimpleNpc(t, s) {
    t.addFieldInt8(4, +s, 0);
  }
  static addIsCleanPasserByNpc(t, s) {
    t.addFieldInt8(5, +s, 0);
  }
  static endHideByRangeInFlow(t) {
    return t.endObject();
  }
}
exports.HideByRangeInFlow = HideByRangeInFlow;
//# sourceMappingURL=hide-by-range-in-flow.js.map
