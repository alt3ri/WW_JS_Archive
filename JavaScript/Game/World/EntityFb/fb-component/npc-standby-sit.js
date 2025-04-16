"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcStandbySit = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  montage_id_js_1 = require("../fb-action/montage-id.js");
class NpcStandbySit {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsNpcStandbySit(t, i) {
    return (i || new NpcStandbySit()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcStandbySit(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new NpcStandbySit()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  montage(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  registeredMontageId(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new montage_id_js_1.MontageId()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  faceExpressionId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  posEntityId() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startNpcStandbySit(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addMontage(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addRegisteredMontageId(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addFaceExpressionId(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addPosEntityId(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static endNpcStandbySit(t) {
    return t.endObject();
  }
}
exports.NpcStandbySit = NpcStandbySit;
//# sourceMappingURL=npc-standby-sit.js.map
