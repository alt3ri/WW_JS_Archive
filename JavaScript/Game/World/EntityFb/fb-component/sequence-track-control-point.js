"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SequenceTrackControlPoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SequenceTrackControlPoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSequenceTrackControlPoint(t, e) {
    return (e || new SequenceTrackControlPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSequenceTrackControlPoint(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SequenceTrackControlPoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  mark(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startSequenceTrackControlPoint(t) {
    t.startObject(1);
  }
  static addMark(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSequenceTrackControlPoint(t) {
    return t.endObject();
  }
  static createSequenceTrackControlPoint(t, e) {
    return (
      SequenceTrackControlPoint.startSequenceTrackControlPoint(t),
      SequenceTrackControlPoint.addMark(t, e),
      SequenceTrackControlPoint.endSequenceTrackControlPoint(t)
    );
  }
}
exports.SequenceTrackControlPoint = SequenceTrackControlPoint;
//# sourceMappingURL=sequence-track-control-point.js.map
