"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSettlement = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BattleSettlement {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBattleSettlement(t, e) {
    return (e || new BattleSettlement()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBattleSettlement(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BattleSettlement()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  gamePlayCue() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startBattleSettlement(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addGamePlayCue(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endBattleSettlement(t) {
    return t.endObject();
  }
  static createBattleSettlement(t, e, s) {
    return (
      BattleSettlement.startBattleSettlement(t),
      BattleSettlement.addType(t, e),
      BattleSettlement.addGamePlayCue(t, s),
      BattleSettlement.endBattleSettlement(t)
    );
  }
}
exports.BattleSettlement = BattleSettlement;
//# sourceMappingURL=battle-settlement.js.map
