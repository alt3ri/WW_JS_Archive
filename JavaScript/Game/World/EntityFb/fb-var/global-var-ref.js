"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GlobalVarRef = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GlobalVarRef {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsGlobalVarRef(t, e) {
    return (e || new GlobalVarRef()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGlobalVarRef(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new GlobalVarRef()).__init(
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
  keyword(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startGlobalVarRef(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addSource(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addKeyword(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endGlobalVarRef(t) {
    return t.endObject();
  }
  static createGlobalVarRef(t, e, r, a) {
    return (
      GlobalVarRef.startGlobalVarRef(t),
      GlobalVarRef.addType(t, e),
      GlobalVarRef.addSource(t, r),
      GlobalVarRef.addKeyword(t, a),
      GlobalVarRef.endGlobalVarRef(t)
    );
  }
}
exports.GlobalVarRef = GlobalVarRef;
//# sourceMappingURL=global-var-ref.js.map
