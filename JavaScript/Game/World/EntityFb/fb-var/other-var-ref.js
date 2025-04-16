"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OtherVarRef = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OtherVarRef {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsOtherVarRef(t, e) {
    return (e || new OtherVarRef()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOtherVarRef(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new OtherVarRef()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  source(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  refType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  refId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  name(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startOtherVarRef(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addSource(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addRefType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addRefId(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addName(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endOtherVarRef(t) {
    return t.endObject();
  }
  static createOtherVarRef(t, e, r, s, i, a) {
    return (
      OtherVarRef.startOtherVarRef(t),
      OtherVarRef.addType(t, e),
      OtherVarRef.addSource(t, r),
      OtherVarRef.addRefType(t, s),
      OtherVarRef.addRefId(t, i),
      OtherVarRef.addName(t, a),
      OtherVarRef.endOtherVarRef(t)
    );
  }
}
exports.OtherVarRef = OtherVarRef;
//# sourceMappingURL=other-var-ref.js.map
