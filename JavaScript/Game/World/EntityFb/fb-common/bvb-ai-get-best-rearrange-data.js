"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbAiGetBestRearrangeData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiGetBestRearrangeData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBvbAiGetBestRearrangeData(t, e) {
    return (e || new BvbAiGetBestRearrangeData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbAiGetBestRearrangeData(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BvbAiGetBestRearrangeData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startBvbAiGetBestRearrangeData(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endBvbAiGetBestRearrangeData(t) {
    return t.endObject();
  }
  static createBvbAiGetBestRearrangeData(t, e) {
    return (
      BvbAiGetBestRearrangeData.startBvbAiGetBestRearrangeData(t),
      BvbAiGetBestRearrangeData.addType(t, e),
      BvbAiGetBestRearrangeData.endBvbAiGetBestRearrangeData(t)
    );
  }
}
exports.BvbAiGetBestRearrangeData = BvbAiGetBestRearrangeData;
//# sourceMappingURL=bvb-ai-get-best-rearrange-data.js.map
