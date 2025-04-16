"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SequenceTrackControl = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  sequence_track_control_point_js_1 = require("../fb-component/sequence-track-control-point.js");
class SequenceTrackControl {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSequenceTrackControl(t, e) {
    return (e || new SequenceTrackControl()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSequenceTrackControl(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SequenceTrackControl()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  sequence(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  controlPoints(t, e) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r
      ? (
          e || new sequence_track_control_point_js_1.SequenceTrackControlPoint()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  controlPointsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startSequenceTrackControl(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addSequence(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addControlPoints(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createControlPointsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addOffset(r[t]);
    return e.endVector();
  }
  static startControlPointsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endSequenceTrackControl(t) {
    return t.endObject();
  }
  static createSequenceTrackControl(t, e, r, o) {
    return (
      SequenceTrackControl.startSequenceTrackControl(t),
      SequenceTrackControl.addType(t, e),
      SequenceTrackControl.addSequence(t, r),
      SequenceTrackControl.addControlPoints(t, o),
      SequenceTrackControl.endSequenceTrackControl(t)
    );
  }
}
exports.SequenceTrackControl = SequenceTrackControl;
//# sourceMappingURL=sequence-track-control.js.map
