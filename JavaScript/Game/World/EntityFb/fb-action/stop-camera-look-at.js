"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StopCameraLookAt = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StopCameraLookAt {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsStopCameraLookAt(t, o) {
    return (o || new StopCameraLookAt()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStopCameraLookAt(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new StopCameraLookAt()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startStopCameraLookAt(t) {
    t.startObject(0);
  }
  static endStopCameraLookAt(t) {
    return t.endObject();
  }
  static createStopCameraLookAt(t) {
    return (
      StopCameraLookAt.startStopCameraLookAt(t),
      StopCameraLookAt.endStopCameraLookAt(t)
    );
  }
}
exports.StopCameraLookAt = StopCameraLookAt;
//# sourceMappingURL=stop-camera-look-at.js.map
