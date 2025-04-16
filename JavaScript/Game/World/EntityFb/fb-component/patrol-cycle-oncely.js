"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PatrolCycleOncely = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PatrolCycleOncely {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPatrolCycleOncely(t, e) {
    return (e || new PatrolCycleOncely()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPatrolCycleOncely(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PatrolCycleOncely()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startPatrolCycleOncely(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPatrolCycleOncely(t) {
    return t.endObject();
  }
  static createPatrolCycleOncely(t, e) {
    return (
      PatrolCycleOncely.startPatrolCycleOncely(t),
      PatrolCycleOncely.addType(t, e),
      PatrolCycleOncely.endPatrolCycleOncely(t)
    );
  }
}
exports.PatrolCycleOncely = PatrolCycleOncely;
//# sourceMappingURL=patrol-cycle-oncely.js.map
