"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActiveAntiGravitySafePoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActiveAntiGravitySafePoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsActiveAntiGravitySafePoint(t, i) {
    return (i || new ActiveAntiGravitySafePoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActiveAntiGravitySafePoint(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ActiveAntiGravitySafePoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startActiveAntiGravitySafePoint(t) {
    t.startObject(0);
  }
  static endActiveAntiGravitySafePoint(t) {
    return t.endObject();
  }
  static createActiveAntiGravitySafePoint(t) {
    return (
      ActiveAntiGravitySafePoint.startActiveAntiGravitySafePoint(t),
      ActiveAntiGravitySafePoint.endActiveAntiGravitySafePoint(t)
    );
  }
}
exports.ActiveAntiGravitySafePoint = ActiveAntiGravitySafePoint;
//# sourceMappingURL=active-anti-gravity-safe-point.js.map
