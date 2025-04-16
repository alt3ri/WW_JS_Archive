"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerNewSplineMoveTarget = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayerNewSplineMoveTarget {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsPlayerNewSplineMoveTarget(e, t) {
    return (t || new PlayerNewSplineMoveTarget()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPlayerNewSplineMoveTarget(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new PlayerNewSplineMoveTarget()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startPlayerNewSplineMoveTarget(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endPlayerNewSplineMoveTarget(e) {
    return e.endObject();
  }
  static createPlayerNewSplineMoveTarget(e, t) {
    return (
      PlayerNewSplineMoveTarget.startPlayerNewSplineMoveTarget(e),
      PlayerNewSplineMoveTarget.addType(e, t),
      PlayerNewSplineMoveTarget.endPlayerNewSplineMoveTarget(e)
    );
  }
}
exports.PlayerNewSplineMoveTarget = PlayerNewSplineMoveTarget;
//# sourceMappingURL=player-new-spline-move-target.js.map
