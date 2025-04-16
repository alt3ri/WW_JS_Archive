"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbStartRoundData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbStartRoundData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBvbStartRoundData(t, a) {
    return (a || new BvbStartRoundData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbStartRoundData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BvbStartRoundData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startBvbStartRoundData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbStartRoundData(t) {
    return t.endObject();
  }
  static createBvbStartRoundData(t, a) {
    return (
      BvbStartRoundData.startBvbStartRoundData(t),
      BvbStartRoundData.addType(t, a),
      BvbStartRoundData.endBvbStartRoundData(t)
    );
  }
}
exports.BvbStartRoundData = BvbStartRoundData;
//# sourceMappingURL=bvb-start-round-data.js.map
