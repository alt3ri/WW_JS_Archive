"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WindDirectional = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  wind_directional_state_grade_js_1 = require("../fb-component/wind-directional-state-grade.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class WindDirectional {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsWindDirectional(t, i) {
    return (i || new WindDirectional()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsWindDirectional(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new WindDirectional()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  rot(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  grades(t, i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (
          i || new wind_directional_state_grade_js_1.WindDirectionalStateGrade()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  gradesLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startWindDirectional(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addRot(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addGrades(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createGradesVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startGradesVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endWindDirectional(t) {
    return t.endObject();
  }
}
exports.WindDirectional = WindDirectional;
//# sourceMappingURL=wind-directional.js.map
