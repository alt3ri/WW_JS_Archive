"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FreeAngleItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FreeAngleItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsFreeAngleItem(e, t) {
    return (t || new FreeAngleItem()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsFreeAngleItem(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FreeAngleItem()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  initAngle() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  targetAngle() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startFreeAngleItem(e) {
    e.startObject(2);
  }
  static addInitAngle(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addTargetAngle(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endFreeAngleItem(e) {
    return e.endObject();
  }
  static createFreeAngleItem(e, t, r) {
    return (
      FreeAngleItem.startFreeAngleItem(e),
      FreeAngleItem.addInitAngle(e, t),
      FreeAngleItem.addTargetAngle(e, r),
      FreeAngleItem.endFreeAngleItem(e)
    );
  }
}
exports.FreeAngleItem = FreeAngleItem;
//# sourceMappingURL=free-angle-item.js.map
