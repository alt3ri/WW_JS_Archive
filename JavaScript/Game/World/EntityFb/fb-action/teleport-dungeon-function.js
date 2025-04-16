"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportDungeonFunction = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportDungeonFunction {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleportDungeonFunction(t, e) {
    return (e || new TeleportDungeonFunction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleportDungeonFunction(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleportDungeonFunction()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  enable() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  dungeonList(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  dungeonListLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  dungeonListArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startTeleportDungeonFunction(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEnable(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addDungeonList(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createDungeonListVector(e, n) {
    e.startVector(4, n.length, 4);
    for (let t = n.length - 1; 0 <= t; t--) e.addInt32(n[t]);
    return e.endVector();
  }
  static startDungeonListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endTeleportDungeonFunction(t) {
    return t.endObject();
  }
  static createTeleportDungeonFunction(t, e, n, i) {
    return (
      TeleportDungeonFunction.startTeleportDungeonFunction(t),
      TeleportDungeonFunction.addType(t, e),
      TeleportDungeonFunction.addEnable(t, n),
      TeleportDungeonFunction.addDungeonList(t, i),
      TeleportDungeonFunction.endTeleportDungeonFunction(t)
    );
  }
}
exports.TeleportDungeonFunction = TeleportDungeonFunction;
//# sourceMappingURL=teleport-dungeon-function.js.map
