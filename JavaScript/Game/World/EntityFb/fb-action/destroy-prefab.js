"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DestroyPrefab = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class DestroyPrefab {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(r, e) {
    return (this.bb_pos = r), (this.bb = e), this;
  }
  static getRootAsDestroyPrefab(r, e) {
    return (e || new DestroyPrefab()).__init(
      r.readInt32(r.position()) + r.position(),
      r,
    );
  }
  static getSizePrefixedRootAsDestroyPrefab(r, e) {
    return (
      r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DestroyPrefab()).__init(
        r.readInt32(r.position()) + r.position(),
        r,
      )
    );
  }
  varNameType() {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r
      ? this.bb.readUint8(this.bb_pos + r)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  varName(r) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(r, this.bb_pos + e) : void 0;
  }
  static startDestroyPrefab(r) {
    r.startObject(2);
  }
  static addVarNameType(r, e) {
    r.addFieldInt8(0, e, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVarName(r, e) {
    r.addFieldOffset(1, e, 0);
  }
  static endDestroyPrefab(r) {
    return r.endObject();
  }
  static createDestroyPrefab(r, e, t) {
    return (
      DestroyPrefab.startDestroyPrefab(r),
      DestroyPrefab.addVarNameType(r, e),
      DestroyPrefab.addVarName(r, t),
      DestroyPrefab.endDestroyPrefab(r)
    );
  }
}
exports.DestroyPrefab = DestroyPrefab;
//# sourceMappingURL=destroy-prefab.js.map
