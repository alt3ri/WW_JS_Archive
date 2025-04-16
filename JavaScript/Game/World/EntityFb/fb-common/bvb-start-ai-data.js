"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbStartAiData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbStartAiData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBvbStartAiData(t, a) {
    return (a || new BvbStartAiData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbStartAiData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BvbStartAiData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startBvbStartAiData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbStartAiData(t) {
    return t.endObject();
  }
  static createBvbStartAiData(t, a) {
    return (
      BvbStartAiData.startBvbStartAiData(t),
      BvbStartAiData.addType(t, a),
      BvbStartAiData.endBvbStartAiData(t)
    );
  }
}
exports.BvbStartAiData = BvbStartAiData;
//# sourceMappingURL=bvb-start-ai-data.js.map
