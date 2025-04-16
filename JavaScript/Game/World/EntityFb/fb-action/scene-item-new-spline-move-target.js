"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemNewSplineMoveTarget = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SceneItemNewSplineMoveTarget {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSceneItemNewSplineMoveTarget(e, t) {
    return (t || new SceneItemNewSplineMoveTarget()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSceneItemNewSplineMoveTarget(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SceneItemNewSplineMoveTarget()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  entityId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  isLookDir() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startSceneItemNewSplineMoveTarget(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addEntityId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addIsLookDir(e, t) {
    e.addFieldInt8(2, +t, 0);
  }
  static endSceneItemNewSplineMoveTarget(e) {
    return e.endObject();
  }
  static createSceneItemNewSplineMoveTarget(e, t, i, r) {
    return (
      SceneItemNewSplineMoveTarget.startSceneItemNewSplineMoveTarget(e),
      SceneItemNewSplineMoveTarget.addType(e, t),
      SceneItemNewSplineMoveTarget.addEntityId(e, i),
      SceneItemNewSplineMoveTarget.addIsLookDir(e, r),
      SceneItemNewSplineMoveTarget.endSceneItemNewSplineMoveTarget(e)
    );
  }
}
exports.SceneItemNewSplineMoveTarget = SceneItemNewSplineMoveTarget;
//# sourceMappingURL=scene-item-new-spline-move-target.js.map
