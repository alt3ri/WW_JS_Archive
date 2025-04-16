"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SwitchDataLayers = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SwitchDataLayers {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsSwitchDataLayers(t, a) {
    return (a || new SwitchDataLayers()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSwitchDataLayers(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new SwitchDataLayers()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  loadDataLayers(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.readInt32(this.bb.__vector(this.bb_pos + a) + 4 * t) : 0;
  }
  loadDataLayersLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  loadDataLayersArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  unloadDataLayers(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.readInt32(this.bb.__vector(this.bb_pos + a) + 4 * t) : 0;
  }
  unloadDataLayersLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  unloadDataLayersArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startSwitchDataLayers(t) {
    t.startObject(2);
  }
  static addLoadDataLayers(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static createLoadDataLayersVector(a, s) {
    a.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) a.addInt32(s[t]);
    return a.endVector();
  }
  static startLoadDataLayersVector(t, a) {
    t.startVector(4, a, 4);
  }
  static addUnloadDataLayers(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static createUnloadDataLayersVector(a, s) {
    a.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) a.addInt32(s[t]);
    return a.endVector();
  }
  static startUnloadDataLayersVector(t, a) {
    t.startVector(4, a, 4);
  }
  static endSwitchDataLayers(t) {
    return t.endObject();
  }
  static createSwitchDataLayers(t, a, s) {
    return (
      SwitchDataLayers.startSwitchDataLayers(t),
      SwitchDataLayers.addLoadDataLayers(t, a),
      SwitchDataLayers.addUnloadDataLayers(t, s),
      SwitchDataLayers.endSwitchDataLayers(t)
    );
  }
}
exports.SwitchDataLayers = SwitchDataLayers;
//# sourceMappingURL=switch-data-layers.js.map
