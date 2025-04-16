"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowTrackToSplineDestination = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FollowTrackToSplineDestination {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFollowTrackToSplineDestination(t, i) {
    return (i || new FollowTrackToSplineDestination()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFollowTrackToSplineDestination(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FollowTrackToSplineDestination()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  changeSelfState(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startFollowTrackToSplineDestination(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addChangeSelfState(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endFollowTrackToSplineDestination(t) {
    return t.endObject();
  }
  static createFollowTrackToSplineDestination(t, i, e) {
    return (
      FollowTrackToSplineDestination.startFollowTrackToSplineDestination(t),
      FollowTrackToSplineDestination.addType(t, i),
      FollowTrackToSplineDestination.addChangeSelfState(t, e),
      FollowTrackToSplineDestination.endFollowTrackToSplineDestination(t)
    );
  }
}
exports.FollowTrackToSplineDestination = FollowTrackToSplineDestination;
//# sourceMappingURL=follow-track-to-spline-destination.js.map
