"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ControlTrackingSelf = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ControlTrackingSelf {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsControlTrackingSelf(t, r) {
    return (r || new ControlTrackingSelf()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsControlTrackingSelf(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ControlTrackingSelf()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startControlTrackingSelf(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endControlTrackingSelf(t) {
    return t.endObject();
  }
  static createControlTrackingSelf(t, r) {
    return (
      ControlTrackingSelf.startControlTrackingSelf(t),
      ControlTrackingSelf.addType(t, r),
      ControlTrackingSelf.endControlTrackingSelf(t)
    );
  }
}
exports.ControlTrackingSelf = ControlTrackingSelf;
//# sourceMappingURL=control-tracking-self.js.map
