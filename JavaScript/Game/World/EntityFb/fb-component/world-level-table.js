"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldLevelTable = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class WorldLevelTable {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsWorldLevelTable(e, t) {
    return (t || new WorldLevelTable()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsWorldLevelTable(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new WorldLevelTable()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  worldLevelBonusId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startWorldLevelTable(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addWorldLevelBonusId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endWorldLevelTable(e) {
    return e.endObject();
  }
  static createWorldLevelTable(e, t, l) {
    return (
      WorldLevelTable.startWorldLevelTable(e),
      WorldLevelTable.addType(e, t),
      WorldLevelTable.addWorldLevelBonusId(e, l),
      WorldLevelTable.endWorldLevelTable(e)
    );
  }
}
exports.WorldLevelTable = WorldLevelTable;
//# sourceMappingURL=world-level-table.js.map
