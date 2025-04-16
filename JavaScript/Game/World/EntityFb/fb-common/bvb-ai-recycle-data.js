"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbAiRecycleData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiRecycleData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBvbAiRecycleData(t, e) {
    return (e || new BvbAiRecycleData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbAiRecycleData(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BvbAiRecycleData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startBvbAiRecycleData(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endBvbAiRecycleData(t) {
    return t.endObject();
  }
  static createBvbAiRecycleData(t, e) {
    return (
      BvbAiRecycleData.startBvbAiRecycleData(t),
      BvbAiRecycleData.addType(t, e),
      BvbAiRecycleData.endBvbAiRecycleData(t)
    );
  }
}
exports.BvbAiRecycleData = BvbAiRecycleData;
//# sourceMappingURL=bvb-ai-recycle-data.js.map
