"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DungeonEntryComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DungeonEntryComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(n, t) {
    return (this.bb_pos = n), (this.bb = t), this;
  }
  static getRootAsDungeonEntryComponent(n, t) {
    return (t || new DungeonEntryComponent()).__init(
      n.readInt32(n.position()) + n.position(),
      n,
    );
  }
  static getSizePrefixedRootAsDungeonEntryComponent(n, t) {
    return (
      n.setPosition(n.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new DungeonEntryComponent()).__init(
        n.readInt32(n.position()) + n.position(),
        n,
      )
    );
  }
  disabled() {
    var n = this.bb.__offset(this.bb_pos, 4);
    return !!n && !!this.bb.readInt8(this.bb_pos + n);
  }
  static startDungeonEntryComponent(n) {
    n.startObject(1);
  }
  static addDisabled(n, t) {
    n.addFieldInt8(0, +t, 0);
  }
  static endDungeonEntryComponent(n) {
    return n.endObject();
  }
  static createDungeonEntryComponent(n, t) {
    return (
      DungeonEntryComponent.startDungeonEntryComponent(n),
      DungeonEntryComponent.addDisabled(n, t),
      DungeonEntryComponent.endDungeonEntryComponent(n)
    );
  }
}
exports.DungeonEntryComponent = DungeonEntryComponent;
//# sourceMappingURL=dungeon-entry-component.js.map
