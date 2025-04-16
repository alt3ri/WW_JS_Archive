"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DetectTrigger = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DetectTrigger {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsDetectTrigger(e, t) {
    return (t || new DetectTrigger()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsDetectTrigger(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new DetectTrigger()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  static startDetectTrigger(e) {
    e.startObject(0);
  }
  static endDetectTrigger(e) {
    return e.endObject();
  }
  static createDetectTrigger(e) {
    return (
      DetectTrigger.startDetectTrigger(e), DetectTrigger.endDetectTrigger(e)
    );
  }
}
exports.DetectTrigger = DetectTrigger;
//# sourceMappingURL=detect-trigger.js.map
