"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetMonsterMoveTarget = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetMonsterMoveTarget {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetMonsterMoveTarget(t, e) {
    return (e || new SetMonsterMoveTarget()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetMonsterMoveTarget(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetMonsterMoveTarget()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  targetEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  moveEvent(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  monsterEntityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  monsterEntityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  monsterEntityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startSetMonsterMoveTarget(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addMoveEvent(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addMonsterEntityIds(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createMonsterEntityIdsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addInt32(r[t]);
    return e.endVector();
  }
  static startMonsterEntityIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endSetMonsterMoveTarget(t) {
    return t.endObject();
  }
  static createSetMonsterMoveTarget(t, e, r, s, i) {
    return (
      SetMonsterMoveTarget.startSetMonsterMoveTarget(t),
      SetMonsterMoveTarget.addType(t, e),
      SetMonsterMoveTarget.addTargetEntityId(t, r),
      SetMonsterMoveTarget.addMoveEvent(t, s),
      SetMonsterMoveTarget.addMonsterEntityIds(t, i),
      SetMonsterMoveTarget.endSetMonsterMoveTarget(t)
    );
  }
}
exports.SetMonsterMoveTarget = SetMonsterMoveTarget;
//# sourceMappingURL=set-monster-move-target.js.map
