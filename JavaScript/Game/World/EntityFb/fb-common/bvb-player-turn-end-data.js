"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbPlayerTurnEndData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbPlayerTurnEndData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBvbPlayerTurnEndData(t, a) {
    return (a || new BvbPlayerTurnEndData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbPlayerTurnEndData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BvbPlayerTurnEndData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startBvbPlayerTurnEndData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbPlayerTurnEndData(t) {
    return t.endObject();
  }
  static createBvbPlayerTurnEndData(t, a) {
    return (
      BvbPlayerTurnEndData.startBvbPlayerTurnEndData(t),
      BvbPlayerTurnEndData.addType(t, a),
      BvbPlayerTurnEndData.endBvbPlayerTurnEndData(t)
    );
  }
}
exports.BvbPlayerTurnEndData = BvbPlayerTurnEndData;
//# sourceMappingURL=bvb-player-turn-end-data.js.map
