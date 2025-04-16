"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StandControl = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StandControl {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsStandControl(t, r) {
    return (r || new StandControl()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStandControl(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new StandControl()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startStandControl(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endStandControl(t) {
    return t.endObject();
  }
  static createStandControl(t, r) {
    return (
      StandControl.startStandControl(t),
      StandControl.addType(t, r),
      StandControl.endStandControl(t)
    );
  }
}
exports.StandControl = StandControl;
//# sourceMappingURL=stand-control.js.map
