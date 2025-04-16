"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcStandbyShowFinitelyInfo = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  montage_id_js_1 = require("../fb-action/montage-id.js"),
  ignore_entity_ids_collision_js_1 = require("../fb-component/ignore-entity-ids-collision.js");
class NpcStandbyShowFinitelyInfo {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsNpcStandbyShowFinitelyInfo(t, i) {
    return (i || new NpcStandbyShowFinitelyInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcStandbyShowFinitelyInfo(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new NpcStandbyShowFinitelyInfo()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  montage(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  registeredMontageId(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new montage_id_js_1.MontageId()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  faceExpressionId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  ignoreEntityCollision(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (
          t || new ignore_entity_ids_collision_js_1.IgnoreEntityIdsCollision()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  static startNpcStandbyShowFinitelyInfo(t) {
    t.startObject(5);
  }
  static addMontage(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addRegisteredMontageId(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addFaceExpressionId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addTime(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addIgnoreEntityCollision(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endNpcStandbyShowFinitelyInfo(t) {
    return t.endObject();
  }
}
exports.NpcStandbyShowFinitelyInfo = NpcStandbyShowFinitelyInfo;
//# sourceMappingURL=npc-standby-show-finitely-info.js.map
