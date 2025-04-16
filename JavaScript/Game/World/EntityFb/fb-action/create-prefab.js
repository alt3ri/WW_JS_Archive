"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreatePrefab = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_prefab_config_js_1 = require("../fb-action/union-prefab-config.js"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class CreatePrefab {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCreatePrefab(e, t) {
    return (t || new CreatePrefab()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCreatePrefab(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CreatePrefab()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  posEntityId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  configType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_prefab_config_js_1.UnionPrefabConfig.NONE;
  }
  config(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  varNameType() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  varName(e) {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startCreatePrefab(e) {
    e.startObject(5);
  }
  static addPosEntityId(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addConfigType(e, t) {
    e.addFieldInt8(1, t, union_prefab_config_js_1.UnionPrefabConfig.NONE);
  }
  static addConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addVarNameType(e, t) {
    e.addFieldInt8(3, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVarName(e, t) {
    e.addFieldOffset(4, t, 0);
  }
  static endCreatePrefab(e) {
    return e.endObject();
  }
  static createCreatePrefab(e, t, r, a, i, s) {
    return (
      CreatePrefab.startCreatePrefab(e),
      CreatePrefab.addPosEntityId(e, t),
      CreatePrefab.addConfigType(e, r),
      CreatePrefab.addConfig(e, a),
      CreatePrefab.addVarNameType(e, i),
      CreatePrefab.addVarName(e, s),
      CreatePrefab.endCreatePrefab(e)
    );
  }
}
exports.CreatePrefab = CreatePrefab;
//# sourceMappingURL=create-prefab.js.map
