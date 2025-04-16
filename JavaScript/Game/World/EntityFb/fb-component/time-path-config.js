"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimePathConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TimePathConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsTimePathConfig(t, i) {
    return (i || new TimePathConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTimePathConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new TimePathConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  totalTime() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  timePathCurve(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startTimePathConfig(t) {
    t.startObject(2);
  }
  static addTotalTime(t, i) {
    t.addFieldFloat32(0, i, 0);
  }
  static addTimePathCurve(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endTimePathConfig(t) {
    return t.endObject();
  }
  static createTimePathConfig(t, i, e) {
    return (
      TimePathConfig.startTimePathConfig(t),
      TimePathConfig.addTotalTime(t, i),
      TimePathConfig.addTimePathCurve(t, e),
      TimePathConfig.endTimePathConfig(t)
    );
  }
}
exports.TimePathConfig = TimePathConfig;
//# sourceMappingURL=time-path-config.js.map
