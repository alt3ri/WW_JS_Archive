"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeActorMaterialData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  actor_ref_js_1 = require("../fb-actor/actor-ref.js");
class ChangeActorMaterialData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsChangeActorMaterialData(t, a) {
    return (a || new ChangeActorMaterialData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeActorMaterialData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new ChangeActorMaterialData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  materialData(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  actorRefs(t, a) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r
      ? (a || new actor_ref_js_1.ActorRef()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actorRefsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startChangeActorMaterialData(t) {
    t.startObject(3);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addMaterialData(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static addActorRefs(t, a) {
    t.addFieldOffset(2, a, 0);
  }
  static createActorRefsVector(a, r) {
    a.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) a.addOffset(r[t]);
    return a.endVector();
  }
  static startActorRefsVector(t, a) {
    t.startVector(4, a, 4);
  }
  static endChangeActorMaterialData(t) {
    return t.endObject();
  }
  static createChangeActorMaterialData(t, a, r, e) {
    return (
      ChangeActorMaterialData.startChangeActorMaterialData(t),
      ChangeActorMaterialData.addType(t, a),
      ChangeActorMaterialData.addMaterialData(t, r),
      ChangeActorMaterialData.addActorRefs(t, e),
      ChangeActorMaterialData.endChangeActorMaterialData(t)
    );
  }
}
exports.ChangeActorMaterialData = ChangeActorMaterialData;
//# sourceMappingURL=change-actor-material-data.js.map
