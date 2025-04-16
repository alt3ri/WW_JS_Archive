"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbAiSwapData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiSwapData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBvbAiSwapData(t, a) {
    return (a || new BvbAiSwapData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbAiSwapData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BvbAiSwapData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startBvbAiSwapData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbAiSwapData(t) {
    return t.endObject();
  }
  static createBvbAiSwapData(t, a) {
    return (
      BvbAiSwapData.startBvbAiSwapData(t),
      BvbAiSwapData.addType(t, a),
      BvbAiSwapData.endBvbAiSwapData(t)
    );
  }
}
exports.BvbAiSwapData = BvbAiSwapData;
//# sourceMappingURL=bvb-ai-swap-data.js.map
