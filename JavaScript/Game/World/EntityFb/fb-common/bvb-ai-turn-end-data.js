"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbAiTurnEndData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiTurnEndData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBvbAiTurnEndData(t, a) {
    return (a || new BvbAiTurnEndData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbAiTurnEndData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BvbAiTurnEndData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startBvbAiTurnEndData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbAiTurnEndData(t) {
    return t.endObject();
  }
  static createBvbAiTurnEndData(t, a) {
    return (
      BvbAiTurnEndData.startBvbAiTurnEndData(t),
      BvbAiTurnEndData.addType(t, a),
      BvbAiTurnEndData.endBvbAiTurnEndData(t)
    );
  }
}
exports.BvbAiTurnEndData = BvbAiTurnEndData;
//# sourceMappingURL=bvb-ai-turn-end-data.js.map
