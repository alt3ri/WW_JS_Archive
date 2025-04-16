"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbPlayerBattleWinData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbPlayerBattleWinData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBvbPlayerBattleWinData(t, a) {
    return (a || new BvbPlayerBattleWinData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbPlayerBattleWinData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BvbPlayerBattleWinData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startBvbPlayerBattleWinData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbPlayerBattleWinData(t) {
    return t.endObject();
  }
  static createBvbPlayerBattleWinData(t, a) {
    return (
      BvbPlayerBattleWinData.startBvbPlayerBattleWinData(t),
      BvbPlayerBattleWinData.addType(t, a),
      BvbPlayerBattleWinData.endBvbPlayerBattleWinData(t)
    );
  }
}
exports.BvbPlayerBattleWinData = BvbPlayerBattleWinData;
//# sourceMappingURL=bvb-player-battle-win-data.js.map
