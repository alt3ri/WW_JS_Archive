"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SlashAndTowerGotoNextFloor = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SlashAndTowerGotoNextFloor {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(o, t) {
    return (this.bb_pos = o), (this.bb = t), this;
  }
  static getRootAsSlashAndTowerGotoNextFloor(o, t) {
    return (t || new SlashAndTowerGotoNextFloor()).__init(
      o.readInt32(o.position()) + o.position(),
      o,
    );
  }
  static getSizePrefixedRootAsSlashAndTowerGotoNextFloor(o, t) {
    return (
      o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SlashAndTowerGotoNextFloor()).__init(
        o.readInt32(o.position()) + o.position(),
        o,
      )
    );
  }
  static startSlashAndTowerGotoNextFloor(o) {
    o.startObject(0);
  }
  static endSlashAndTowerGotoNextFloor(o) {
    return o.endObject();
  }
  static createSlashAndTowerGotoNextFloor(o) {
    return (
      SlashAndTowerGotoNextFloor.startSlashAndTowerGotoNextFloor(o),
      SlashAndTowerGotoNextFloor.endSlashAndTowerGotoNextFloor(o)
    );
  }
}
exports.SlashAndTowerGotoNextFloor = SlashAndTowerGotoNextFloor;
//# sourceMappingURL=slash-and-tower-goto-next-floor.js.map
