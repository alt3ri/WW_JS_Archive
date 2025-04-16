"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DurationInteract = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DurationInteract {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsDurationInteract(t, r) {
    return (r || new DurationInteract()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDurationInteract(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new DurationInteract()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startDurationInteract(t) {
    t.startObject(1);
  }
  static addDuration(t, r) {
    t.addFieldFloat32(0, r, 0);
  }
  static endDurationInteract(t) {
    return t.endObject();
  }
  static createDurationInteract(t, r) {
    return (
      DurationInteract.startDurationInteract(t),
      DurationInteract.addDuration(t, r),
      DurationInteract.endDurationInteract(t)
    );
  }
}
exports.DurationInteract = DurationInteract;
//# sourceMappingURL=duration-interact.js.map
