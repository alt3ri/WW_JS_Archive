"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AngleWeight = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_angle_weight_js_1 = require("../fb-component/entity-angle-weight.js");
class AngleWeight {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsAngleWeight(t, e) {
    return (e || new AngleWeight()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAngleWeight(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new AngleWeight()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  angleWeight(t, e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (e || new entity_angle_weight_js_1.EntityAngleWeight()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  angleWeightLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startAngleWeight(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addAngleWeight(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createAngleWeightVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startAngleWeightVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endAngleWeight(t) {
    return t.endObject();
  }
  static createAngleWeight(t, e, i) {
    return (
      AngleWeight.startAngleWeight(t),
      AngleWeight.addType(t, e),
      AngleWeight.addAngleWeight(t, i),
      AngleWeight.endAngleWeight(t)
    );
  }
}
exports.AngleWeight = AngleWeight;
//# sourceMappingURL=angle-weight.js.map
