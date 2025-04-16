"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StandControl2 = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StandControl2 {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsStandControl2(t, r) {
    return (r || new StandControl2()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStandControl2(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new StandControl2()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startStandControl2(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endStandControl2(t) {
    return t.endObject();
  }
  static createStandControl2(t, r) {
    return (
      StandControl2.startStandControl2(t),
      StandControl2.addType(t, r),
      StandControl2.endStandControl2(t)
    );
  }
}
exports.StandControl2 = StandControl2;
//# sourceMappingURL=stand-control2.js.map
