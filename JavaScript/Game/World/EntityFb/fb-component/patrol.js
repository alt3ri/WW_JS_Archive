"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Patrol = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  patrol_action_js_1 = require("../fb-component/patrol-action.js");
class Patrol {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsPatrol(t, s) {
    return (s || new Patrol()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPatrol(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new Patrol()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isCircle() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  actions(t, s) {
    var r = this.bb.__offset(this.bb_pos, 10);
    return r
      ? (s || new patrol_action_js_1.PatrolAction()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startPatrol(t) {
    t.startObject(4);
  }
  static addDisabled(t, s) {
    t.addFieldInt8(0, +s, 0);
  }
  static addSplineEntityId(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addIsCircle(t, s) {
    t.addFieldInt8(2, +s, 0);
  }
  static addActions(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static createActionsVector(s, r) {
    s.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) s.addOffset(r[t]);
    return s.endVector();
  }
  static startActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endPatrol(t) {
    return t.endObject();
  }
  static createPatrol(t, s, r, i, a) {
    return (
      Patrol.startPatrol(t),
      Patrol.addDisabled(t, s),
      Patrol.addSplineEntityId(t, r),
      Patrol.addIsCircle(t, i),
      Patrol.addActions(t, a),
      Patrol.endPatrol(t)
    );
  }
}
exports.Patrol = Patrol;
//# sourceMappingURL=patrol.js.map
