"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnlockDungeonEntry = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockDungeonEntry {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(n, t) {
    return (this.bb_pos = n), (this.bb = t), this;
  }
  static getRootAsUnlockDungeonEntry(n, t) {
    return (t || new UnlockDungeonEntry()).__init(
      n.readInt32(n.position()) + n.position(),
      n,
    );
  }
  static getSizePrefixedRootAsUnlockDungeonEntry(n, t) {
    return (
      n.setPosition(n.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new UnlockDungeonEntry()).__init(
        n.readInt32(n.position()) + n.position(),
        n,
      )
    );
  }
  dungeonEntryId() {
    var n = this.bb.__offset(this.bb_pos, 4);
    return n ? this.bb.readInt32(this.bb_pos + n) : 0;
  }
  static startUnlockDungeonEntry(n) {
    n.startObject(1);
  }
  static addDungeonEntryId(n, t) {
    n.addFieldInt32(0, t, 0);
  }
  static endUnlockDungeonEntry(n) {
    return n.endObject();
  }
  static createUnlockDungeonEntry(n, t) {
    return (
      UnlockDungeonEntry.startUnlockDungeonEntry(n),
      UnlockDungeonEntry.addDungeonEntryId(n, t),
      UnlockDungeonEntry.endUnlockDungeonEntry(n)
    );
  }
}
exports.UnlockDungeonEntry = UnlockDungeonEntry;
//# sourceMappingURL=unlock-dungeon-entry.js.map
