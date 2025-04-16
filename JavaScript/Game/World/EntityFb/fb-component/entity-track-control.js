"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityTrackControl = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_track_control_point_js_1 = require("../fb-component/entity-track-control-point.js");
class EntityTrackControl {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsEntityTrackControl(t, r) {
    return (r || new EntityTrackControl()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityTrackControl(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new EntityTrackControl()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  controlPoints(t, r) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (
          r || new entity_track_control_point_js_1.EntityTrackControlPoint()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  controlPointsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startEntityTrackControl(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addEntityId(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static addControlPoints(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static createControlPointsVector(r, i) {
    r.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) r.addOffset(i[t]);
    return r.endVector();
  }
  static startControlPointsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endEntityTrackControl(t) {
    return t.endObject();
  }
  static createEntityTrackControl(t, r, i, o) {
    return (
      EntityTrackControl.startEntityTrackControl(t),
      EntityTrackControl.addType(t, r),
      EntityTrackControl.addEntityId(t, i),
      EntityTrackControl.addControlPoints(t, o),
      EntityTrackControl.endEntityTrackControl(t)
    );
  }
}
exports.EntityTrackControl = EntityTrackControl;
//# sourceMappingURL=entity-track-control.js.map
