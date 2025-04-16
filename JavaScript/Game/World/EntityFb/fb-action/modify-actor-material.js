"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModifyActorMaterial = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_modify_actor_material_type_js_1 = require("../fb-action/union-modify-actor-material-type.js"),
  actor_ref_js_1 = require("../fb-actor/actor-ref.js");
class ModifyActorMaterial {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsModifyActorMaterial(t, r) {
    return (r || new ModifyActorMaterial()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsModifyActorMaterial(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ModifyActorMaterial()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  actorRefs(t, r) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (r || new actor_ref_js_1.ActorRef()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actorRefsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_modify_actor_material_type_js_1.UnionModifyActorMaterialType.NONE;
  }
  config(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r ? this.bb.__union(t, this.bb_pos + r) : void 0;
  }
  static startModifyActorMaterial(t) {
    t.startObject(3);
  }
  static addActorRefs(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static createActorRefsVector(r, i) {
    r.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) r.addOffset(i[t]);
    return r.endVector();
  }
  static startActorRefsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static addConfigType(t, r) {
    t.addFieldInt8(
      1,
      r,
      union_modify_actor_material_type_js_1.UnionModifyActorMaterialType.NONE,
    );
  }
  static addConfig(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endModifyActorMaterial(t) {
    return t.endObject();
  }
  static createModifyActorMaterial(t, r, i, e) {
    return (
      ModifyActorMaterial.startModifyActorMaterial(t),
      ModifyActorMaterial.addActorRefs(t, r),
      ModifyActorMaterial.addConfigType(t, i),
      ModifyActorMaterial.addConfig(t, e),
      ModifyActorMaterial.endModifyActorMaterial(t)
    );
  }
}
exports.ModifyActorMaterial = ModifyActorMaterial;
//# sourceMappingURL=modify-actor-material.js.map
