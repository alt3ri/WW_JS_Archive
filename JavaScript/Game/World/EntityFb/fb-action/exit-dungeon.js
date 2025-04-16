"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExitDungeon = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExitDungeon {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsExitDungeon(t, e) {
    return (e || new ExitDungeon()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExitDungeon(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ExitDungeon()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  isNeedSecondaryConfirmation() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startExitDungeon(t) {
    t.startObject(1);
  }
  static addIsNeedSecondaryConfirmation(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static endExitDungeon(t) {
    return t.endObject();
  }
  static createExitDungeon(t, e) {
    return (
      ExitDungeon.startExitDungeon(t),
      ExitDungeon.addIsNeedSecondaryConfirmation(t, e),
      ExitDungeon.endExitDungeon(t)
    );
  }
}
exports.ExitDungeon = ExitDungeon;
//# sourceMappingURL=exit-dungeon.js.map
