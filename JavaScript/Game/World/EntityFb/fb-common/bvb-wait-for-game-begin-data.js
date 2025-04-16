"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbWaitForGameBeginData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbWaitForGameBeginData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBvbWaitForGameBeginData(t, a) {
    return (a || new BvbWaitForGameBeginData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbWaitForGameBeginData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BvbWaitForGameBeginData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startBvbWaitForGameBeginData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbWaitForGameBeginData(t) {
    return t.endObject();
  }
  static createBvbWaitForGameBeginData(t, a) {
    return (
      BvbWaitForGameBeginData.startBvbWaitForGameBeginData(t),
      BvbWaitForGameBeginData.addType(t, a),
      BvbWaitForGameBeginData.endBvbWaitForGameBeginData(t)
    );
  }
}
exports.BvbWaitForGameBeginData = BvbWaitForGameBeginData;
//# sourceMappingURL=bvb-wait-for-game-begin-data.js.map
