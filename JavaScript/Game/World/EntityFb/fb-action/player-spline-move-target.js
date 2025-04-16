"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerSplineMoveTarget = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayerSplineMoveTarget {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsPlayerSplineMoveTarget(e, t) {
    return (t || new PlayerSplineMoveTarget()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPlayerSplineMoveTarget(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new PlayerSplineMoveTarget()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startPlayerSplineMoveTarget(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endPlayerSplineMoveTarget(e) {
    return e.endObject();
  }
  static createPlayerSplineMoveTarget(e, t) {
    return (
      PlayerSplineMoveTarget.startPlayerSplineMoveTarget(e),
      PlayerSplineMoveTarget.addType(e, t),
      PlayerSplineMoveTarget.endPlayerSplineMoveTarget(e)
    );
  }
}
exports.PlayerSplineMoveTarget = PlayerSplineMoveTarget;
//# sourceMappingURL=player-spline-move-target.js.map
