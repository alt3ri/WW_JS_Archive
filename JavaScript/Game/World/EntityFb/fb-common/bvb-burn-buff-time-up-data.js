"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbBurnBuffTimeUpData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbBurnBuffTimeUpData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBvbBurnBuffTimeUpData(t, e) {
    return (e || new BvbBurnBuffTimeUpData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbBurnBuffTimeUpData(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BvbBurnBuffTimeUpData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startBvbBurnBuffTimeUpData(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endBvbBurnBuffTimeUpData(t) {
    return t.endObject();
  }
  static createBvbBurnBuffTimeUpData(t, e) {
    return (
      BvbBurnBuffTimeUpData.startBvbBurnBuffTimeUpData(t),
      BvbBurnBuffTimeUpData.addType(t, e),
      BvbBurnBuffTimeUpData.endBvbBurnBuffTimeUpData(t)
    );
  }
}
exports.BvbBurnBuffTimeUpData = BvbBurnBuffTimeUpData;
//# sourceMappingURL=bvb-burn-buff-time-up-data.js.map
