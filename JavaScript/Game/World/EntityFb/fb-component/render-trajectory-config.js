"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderTrajectoryConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RenderTrajectoryConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsRenderTrajectoryConfig(e, t) {
    return (t || new RenderTrajectoryConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRenderTrajectoryConfig(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RenderTrajectoryConfig()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  time() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  effect(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startRenderTrajectoryConfig(e) {
    e.startObject(2);
  }
  static addTime(e, t) {
    e.addFieldFloat32(0, t, 0);
  }
  static addEffect(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endRenderTrajectoryConfig(e) {
    return e.endObject();
  }
  static createRenderTrajectoryConfig(e, t, r) {
    return (
      RenderTrajectoryConfig.startRenderTrajectoryConfig(e),
      RenderTrajectoryConfig.addTime(e, t),
      RenderTrajectoryConfig.addEffect(e, r),
      RenderTrajectoryConfig.endRenderTrajectoryConfig(e)
    );
  }
}
exports.RenderTrajectoryConfig = RenderTrajectoryConfig;
//# sourceMappingURL=render-trajectory-config.js.map
