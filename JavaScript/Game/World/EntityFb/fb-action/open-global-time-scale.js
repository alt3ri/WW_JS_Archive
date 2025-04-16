"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenGlobalTimeScale = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OpenGlobalTimeScale {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsOpenGlobalTimeScale(e, t) {
    return (t || new OpenGlobalTimeScale()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsOpenGlobalTimeScale(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new OpenGlobalTimeScale()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  timeScale() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  duration() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  exceptPlayer() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startOpenGlobalTimeScale(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTimeScale(e, t) {
    e.addFieldFloat32(1, t, 0);
  }
  static addDuration(e, t) {
    e.addFieldFloat32(2, t, 0);
  }
  static addExceptPlayer(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static endOpenGlobalTimeScale(e) {
    return e.endObject();
  }
  static createOpenGlobalTimeScale(e, t, a, i, l) {
    return (
      OpenGlobalTimeScale.startOpenGlobalTimeScale(e),
      OpenGlobalTimeScale.addType(e, t),
      OpenGlobalTimeScale.addTimeScale(e, a),
      OpenGlobalTimeScale.addDuration(e, i),
      OpenGlobalTimeScale.addExceptPlayer(e, l),
      OpenGlobalTimeScale.endOpenGlobalTimeScale(e)
    );
  }
}
exports.OpenGlobalTimeScale = OpenGlobalTimeScale;
//# sourceMappingURL=open-global-time-scale.js.map
