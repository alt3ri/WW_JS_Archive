"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableSubLevelTransitionWithSceneCapture = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableSubLevelTransitionWithSceneCapture {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsEnableSubLevelTransitionWithSceneCapture(e, t) {
    return (t || new EnableSubLevelTransitionWithSceneCapture()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsEnableSubLevelTransitionWithSceneCapture(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new EnableSubLevelTransitionWithSceneCapture()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  sceneCaptureEffect(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  screenEffect(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  screenEffectLoop(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startEnableSubLevelTransitionWithSceneCapture(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSceneCaptureEffect(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addScreenEffect(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addScreenEffectLoop(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static endEnableSubLevelTransitionWithSceneCapture(e) {
    return e.endObject();
  }
  static createEnableSubLevelTransitionWithSceneCapture(e, t, i, n, r) {
    return (
      EnableSubLevelTransitionWithSceneCapture.startEnableSubLevelTransitionWithSceneCapture(
        e,
      ),
      EnableSubLevelTransitionWithSceneCapture.addType(e, t),
      EnableSubLevelTransitionWithSceneCapture.addSceneCaptureEffect(e, i),
      EnableSubLevelTransitionWithSceneCapture.addScreenEffect(e, n),
      EnableSubLevelTransitionWithSceneCapture.addScreenEffectLoop(e, r),
      EnableSubLevelTransitionWithSceneCapture.endEnableSubLevelTransitionWithSceneCapture(
        e,
      )
    );
  }
}
exports.EnableSubLevelTransitionWithSceneCapture =
  EnableSubLevelTransitionWithSceneCapture;
//# sourceMappingURL=enable-sub-level-transition-with-scene-capture.js.map
