"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LimitPlayerBlockAll = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LimitPlayerBlockAll {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, l) {
    return (this.bb_pos = t), (this.bb = l), this;
  }
  static getRootAsLimitPlayerBlockAll(t, l) {
    return (l || new LimitPlayerBlockAll()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLimitPlayerBlockAll(t, l) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (l || new LimitPlayerBlockAll()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var l = this.bb.__offset(this.bb_pos, 4);
    return l ? this.bb.__string(this.bb_pos + l, t) : void 0;
  }
  static startLimitPlayerBlockAll(t) {
    t.startObject(1);
  }
  static addType(t, l) {
    t.addFieldOffset(0, l, 0);
  }
  static endLimitPlayerBlockAll(t) {
    return t.endObject();
  }
  static createLimitPlayerBlockAll(t, l) {
    return (
      LimitPlayerBlockAll.startLimitPlayerBlockAll(t),
      LimitPlayerBlockAll.addType(t, l),
      LimitPlayerBlockAll.endLimitPlayerBlockAll(t)
    );
  }
}
exports.LimitPlayerBlockAll = LimitPlayerBlockAll;
//# sourceMappingURL=limit-player-block-all.js.map
