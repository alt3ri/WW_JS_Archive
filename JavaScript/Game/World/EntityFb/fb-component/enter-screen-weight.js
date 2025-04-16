"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnterScreenWeight = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnterScreenWeight {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsEnterScreenWeight(e, t) {
    return (t || new EnterScreenWeight()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsEnterScreenWeight(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new EnterScreenWeight()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  weight() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startEnterScreenWeight(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addWeight(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endEnterScreenWeight(e) {
    return e.endObject();
  }
  static createEnterScreenWeight(e, t, r) {
    return (
      EnterScreenWeight.startEnterScreenWeight(e),
      EnterScreenWeight.addType(e, t),
      EnterScreenWeight.addWeight(e, r),
      EnterScreenWeight.endEnterScreenWeight(e)
    );
  }
}
exports.EnterScreenWeight = EnterScreenWeight;
//# sourceMappingURL=enter-screen-weight.js.map
