"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckDataLayerCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckDataLayerCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsCheckDataLayerCondition(t, a) {
    return (a || new CheckDataLayerCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckDataLayerCondition(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new CheckDataLayerCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  dataLayerId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isLoad() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCheckDataLayerCondition(t) {
    t.startObject(3);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addDataLayerId(t, a) {
    t.addFieldInt32(1, a, 0);
  }
  static addIsLoad(t, a) {
    t.addFieldInt8(2, +a, 0);
  }
  static endCheckDataLayerCondition(t) {
    return t.endObject();
  }
  static createCheckDataLayerCondition(t, a, e, i) {
    return (
      CheckDataLayerCondition.startCheckDataLayerCondition(t),
      CheckDataLayerCondition.addType(t, a),
      CheckDataLayerCondition.addDataLayerId(t, e),
      CheckDataLayerCondition.addIsLoad(t, i),
      CheckDataLayerCondition.endCheckDataLayerCondition(t)
    );
  }
}
exports.CheckDataLayerCondition = CheckDataLayerCondition;
//# sourceMappingURL=check-data-layer-condition.js.map
