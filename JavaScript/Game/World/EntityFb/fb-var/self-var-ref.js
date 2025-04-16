"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelfVarRef = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SelfVarRef {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSelfVarRef(e, t) {
    return (t || new SelfVarRef()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSelfVarRef(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SelfVarRef()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  source(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  name(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startSelfVarRef(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSource(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addName(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endSelfVarRef(e) {
    return e.endObject();
  }
  static createSelfVarRef(e, t, r, s) {
    return (
      SelfVarRef.startSelfVarRef(e),
      SelfVarRef.addType(e, t),
      SelfVarRef.addSource(e, r),
      SelfVarRef.addName(e, s),
      SelfVarRef.endSelfVarRef(e)
    );
  }
}
exports.SelfVarRef = SelfVarRef;
//# sourceMappingURL=self-var-ref.js.map
