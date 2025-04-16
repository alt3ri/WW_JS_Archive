"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemAiPatrolByGameTime = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SceneItemAiPatrolByGameTime {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSceneItemAiPatrolByGameTime(e, t) {
    return (t || new SceneItemAiPatrolByGameTime()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSceneItemAiPatrolByGameTime(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SceneItemAiPatrolByGameTime()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  spline() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startSceneItemAiPatrolByGameTime(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSpline(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endSceneItemAiPatrolByGameTime(e) {
    return e.endObject();
  }
  static createSceneItemAiPatrolByGameTime(e, t, i) {
    return (
      SceneItemAiPatrolByGameTime.startSceneItemAiPatrolByGameTime(e),
      SceneItemAiPatrolByGameTime.addType(e, t),
      SceneItemAiPatrolByGameTime.addSpline(e, i),
      SceneItemAiPatrolByGameTime.endSceneItemAiPatrolByGameTime(e)
    );
  }
}
exports.SceneItemAiPatrolByGameTime = SceneItemAiPatrolByGameTime;
//# sourceMappingURL=scene-item-ai-patrol-by-game-time.js.map
