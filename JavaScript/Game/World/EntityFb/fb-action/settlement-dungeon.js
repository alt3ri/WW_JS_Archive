"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SettlementDungeon = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SettlementDungeon {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSettlementDungeon(e, t) {
    return (t || new SettlementDungeon()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSettlementDungeon(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SettlementDungeon()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  static startSettlementDungeon(e) {
    e.startObject(0);
  }
  static endSettlementDungeon(e) {
    return e.endObject();
  }
  static createSettlementDungeon(e) {
    return (
      SettlementDungeon.startSettlementDungeon(e),
      SettlementDungeon.endSettlementDungeon(e)
    );
  }
}
exports.SettlementDungeon = SettlementDungeon;
//# sourceMappingURL=settlement-dungeon.js.map
