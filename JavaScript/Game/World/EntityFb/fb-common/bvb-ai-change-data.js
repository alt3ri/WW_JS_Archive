"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbAiChangeData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiChangeData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBvbAiChangeData(t, a) {
    return (a || new BvbAiChangeData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbAiChangeData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BvbAiChangeData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startBvbAiChangeData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbAiChangeData(t) {
    return t.endObject();
  }
  static createBvbAiChangeData(t, a) {
    return (
      BvbAiChangeData.startBvbAiChangeData(t),
      BvbAiChangeData.addType(t, a),
      BvbAiChangeData.endBvbAiChangeData(t)
    );
  }
}
exports.BvbAiChangeData = BvbAiChangeData;
//# sourceMappingURL=bvb-ai-change-data.js.map
