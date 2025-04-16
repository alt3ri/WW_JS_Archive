"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbAiBattleWinData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiBattleWinData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBvbAiBattleWinData(t, a) {
    return (a || new BvbAiBattleWinData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbAiBattleWinData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BvbAiBattleWinData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startBvbAiBattleWinData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbAiBattleWinData(t) {
    return t.endObject();
  }
  static createBvbAiBattleWinData(t, a) {
    return (
      BvbAiBattleWinData.startBvbAiBattleWinData(t),
      BvbAiBattleWinData.addType(t, a),
      BvbAiBattleWinData.endBvbAiBattleWinData(t)
    );
  }
}
exports.BvbAiBattleWinData = BvbAiBattleWinData;
//# sourceMappingURL=bvb-ai-battle-win-data.js.map
