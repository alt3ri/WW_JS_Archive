"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnterLeaveRadius = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnterLeaveRadius {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsEnterLeaveRadius(e, t) {
    return (t || new EnterLeaveRadius()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsEnterLeaveRadius(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new EnterLeaveRadius()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  enterRadius() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  leaveRadius() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startEnterLeaveRadius(e) {
    e.startObject(2);
  }
  static addEnterRadius(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addLeaveRadius(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endEnterLeaveRadius(e) {
    return e.endObject();
  }
  static createEnterLeaveRadius(e, t, s) {
    return (
      EnterLeaveRadius.startEnterLeaveRadius(e),
      EnterLeaveRadius.addEnterRadius(e, t),
      EnterLeaveRadius.addLeaveRadius(e, s),
      EnterLeaveRadius.endEnterLeaveRadius(e)
    );
  }
}
exports.EnterLeaveRadius = EnterLeaveRadius;
//# sourceMappingURL=enter-leave-radius.js.map
