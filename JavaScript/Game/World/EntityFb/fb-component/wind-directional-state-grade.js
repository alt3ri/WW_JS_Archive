"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WindDirectionalStateGrade = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class WindDirectionalStateGrade {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsWindDirectionalStateGrade(t, e) {
    return (e || new WindDirectionalStateGrade()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsWindDirectionalStateGrade(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new WindDirectionalStateGrade()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  speed() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  strength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startWindDirectionalStateGrade(t) {
    t.startObject(3);
  }
  static addState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addSpeed(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addStrength(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static endWindDirectionalStateGrade(t) {
    return t.endObject();
  }
  static createWindDirectionalStateGrade(t, e, i, a) {
    return (
      WindDirectionalStateGrade.startWindDirectionalStateGrade(t),
      WindDirectionalStateGrade.addState(t, e),
      WindDirectionalStateGrade.addSpeed(t, i),
      WindDirectionalStateGrade.addStrength(t, a),
      WindDirectionalStateGrade.endWindDirectionalStateGrade(t)
    );
  }
}
exports.WindDirectionalStateGrade = WindDirectionalStateGrade;
//# sourceMappingURL=wind-directional-state-grade.js.map
