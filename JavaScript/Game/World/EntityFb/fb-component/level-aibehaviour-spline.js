"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAIBehaviourSpline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LevelAIBehaviourSpline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsLevelAIBehaviourSpline(e, i) {
    return (i || new LevelAIBehaviourSpline()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsLevelAIBehaviourSpline(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new LevelAIBehaviourSpline()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  splineEntityId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startLevelAIBehaviourSpline(e) {
    e.startObject(2);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addSplineEntityId(e, i) {
    e.addFieldInt32(1, i, 0);
  }
  static endLevelAIBehaviourSpline(e) {
    return e.endObject();
  }
  static createLevelAIBehaviourSpline(e, i, t) {
    return (
      LevelAIBehaviourSpline.startLevelAIBehaviourSpline(e),
      LevelAIBehaviourSpline.addType(e, i),
      LevelAIBehaviourSpline.addSplineEntityId(e, t),
      LevelAIBehaviourSpline.endLevelAIBehaviourSpline(e)
    );
  }
}
exports.LevelAIBehaviourSpline = LevelAIBehaviourSpline;
//# sourceMappingURL=level-aibehaviour-spline.js.map
