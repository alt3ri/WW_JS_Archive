"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivateResetPoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActivateResetPoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsActivateResetPoint(t, e) {
    return (e || new ActivateResetPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActivateResetPoint(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ActivateResetPoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startActivateResetPoint(t) {
    t.startObject(0);
  }
  static endActivateResetPoint(t) {
    return t.endObject();
  }
  static createActivateResetPoint(t) {
    return (
      ActivateResetPoint.startActivateResetPoint(t),
      ActivateResetPoint.endActivateResetPoint(t)
    );
  }
}
exports.ActivateResetPoint = ActivateResetPoint;
//# sourceMappingURL=activate-reset-point.js.map
