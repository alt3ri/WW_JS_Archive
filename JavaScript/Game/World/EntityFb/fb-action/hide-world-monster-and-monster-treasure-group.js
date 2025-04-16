"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HideWorldMonsterAndMonsterTreasureGroup = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HideWorldMonsterAndMonsterTreasureGroup {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsHideWorldMonsterAndMonsterTreasureGroup(e, r) {
    return (r || new HideWorldMonsterAndMonsterTreasureGroup()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsHideWorldMonsterAndMonsterTreasureGroup(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new HideWorldMonsterAndMonsterTreasureGroup()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, e) : void 0;
  }
  hideRangeEntities(e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.readInt32(this.bb.__vector(this.bb_pos + r) + 4 * e) : 0;
  }
  hideRangeEntitiesLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  hideRangeEntitiesArray() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + e),
          this.bb.__vector_len(this.bb_pos + e),
        )
      : void 0;
  }
  static startHideWorldMonsterAndMonsterTreasureGroup(e) {
    e.startObject(2);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addHideRangeEntities(e, r) {
    e.addFieldOffset(1, r, 0);
  }
  static createHideRangeEntitiesVector(r, t) {
    r.startVector(4, t.length, 4);
    for (let e = t.length - 1; 0 <= e; e--) r.addInt32(t[e]);
    return r.endVector();
  }
  static startHideRangeEntitiesVector(e, r) {
    e.startVector(4, r, 4);
  }
  static endHideWorldMonsterAndMonsterTreasureGroup(e) {
    return e.endObject();
  }
  static createHideWorldMonsterAndMonsterTreasureGroup(e, r, t) {
    return (
      HideWorldMonsterAndMonsterTreasureGroup.startHideWorldMonsterAndMonsterTreasureGroup(
        e,
      ),
      HideWorldMonsterAndMonsterTreasureGroup.addType(e, r),
      HideWorldMonsterAndMonsterTreasureGroup.addHideRangeEntities(e, t),
      HideWorldMonsterAndMonsterTreasureGroup.endHideWorldMonsterAndMonsterTreasureGroup(
        e,
      )
    );
  }
}
exports.HideWorldMonsterAndMonsterTreasureGroup =
  HideWorldMonsterAndMonsterTreasureGroup;
//# sourceMappingURL=hide-world-monster-and-monster-treasure-group.js.map
