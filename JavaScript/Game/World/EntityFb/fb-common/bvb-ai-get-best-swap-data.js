"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbAiGetBestSwapData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiGetBestSwapData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBvbAiGetBestSwapData(t, e) {
    return (e || new BvbAiGetBestSwapData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbAiGetBestSwapData(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BvbAiGetBestSwapData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startBvbAiGetBestSwapData(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endBvbAiGetBestSwapData(t) {
    return t.endObject();
  }
  static createBvbAiGetBestSwapData(t, e) {
    return (
      BvbAiGetBestSwapData.startBvbAiGetBestSwapData(t),
      BvbAiGetBestSwapData.addType(t, e),
      BvbAiGetBestSwapData.endBvbAiGetBestSwapData(t)
    );
  }
}
exports.BvbAiGetBestSwapData = BvbAiGetBestSwapData;
//# sourceMappingURL=bvb-ai-get-best-swap-data.js.map
