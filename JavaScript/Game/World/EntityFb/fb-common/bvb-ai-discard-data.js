"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbAiDiscardData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiDiscardData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBvbAiDiscardData(t, a) {
    return (a || new BvbAiDiscardData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbAiDiscardData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BvbAiDiscardData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startBvbAiDiscardData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbAiDiscardData(t) {
    return t.endObject();
  }
  static createBvbAiDiscardData(t, a) {
    return (
      BvbAiDiscardData.startBvbAiDiscardData(t),
      BvbAiDiscardData.addType(t, a),
      BvbAiDiscardData.endBvbAiDiscardData(t)
    );
  }
}
exports.BvbAiDiscardData = BvbAiDiscardData;
//# sourceMappingURL=bvb-ai-discard-data.js.map
