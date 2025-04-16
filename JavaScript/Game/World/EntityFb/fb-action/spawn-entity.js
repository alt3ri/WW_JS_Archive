"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpawnEntity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  transform_js_1 = require("../fb-action/transform.js"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class SpawnEntity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsSpawnEntity(t, s) {
    return (s || new SpawnEntity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSpawnEntity(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new SpawnEntity()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityDataId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  transform(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (t || new transform_js_1.Transform()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  saveType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  save(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s ? this.bb.__union(t, this.bb_pos + s) : void 0;
  }
  static startSpawnEntity(t) {
    t.startObject(4);
  }
  static addEntityDataId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addTransform(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addSaveType(t, s) {
    t.addFieldInt8(2, s, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addSave(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static endSpawnEntity(t) {
    return t.endObject();
  }
}
exports.SpawnEntity = SpawnEntity;
//# sourceMappingURL=spawn-entity.js.map
