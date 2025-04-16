"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbAiRearrangeData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiRearrangeData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(a, t) {
    return (this.bb_pos = a), (this.bb = t), this;
  }
  static getRootAsBvbAiRearrangeData(a, t) {
    return (t || new BvbAiRearrangeData()).__init(
      a.readInt32(a.position()) + a.position(),
      a,
    );
  }
  static getSizePrefixedRootAsBvbAiRearrangeData(a, t) {
    return (
      a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new BvbAiRearrangeData()).__init(
        a.readInt32(a.position()) + a.position(),
        a,
      )
    );
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, a) : void 0;
  }
  static startBvbAiRearrangeData(a) {
    a.startObject(1);
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static endBvbAiRearrangeData(a) {
    return a.endObject();
  }
  static createBvbAiRearrangeData(a, t) {
    return (
      BvbAiRearrangeData.startBvbAiRearrangeData(a),
      BvbAiRearrangeData.addType(a, t),
      BvbAiRearrangeData.endBvbAiRearrangeData(a)
    );
  }
}
exports.BvbAiRearrangeData = BvbAiRearrangeData;
//# sourceMappingURL=bvb-ai-rearrange-data.js.map
