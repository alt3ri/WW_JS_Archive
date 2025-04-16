"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcRideInGongduolaPerform = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NpcRideInGongduolaPerform {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsNpcRideInGongduolaPerform(e, t) {
    return (t || new NpcRideInGongduolaPerform()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsNpcRideInGongduolaPerform(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new NpcRideInGongduolaPerform()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  montage(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startNpcRideInGongduolaPerform(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMontage(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endNpcRideInGongduolaPerform(e) {
    return e.endObject();
  }
  static createNpcRideInGongduolaPerform(e, t, r) {
    return (
      NpcRideInGongduolaPerform.startNpcRideInGongduolaPerform(e),
      NpcRideInGongduolaPerform.addType(e, t),
      NpcRideInGongduolaPerform.addMontage(e, r),
      NpcRideInGongduolaPerform.endNpcRideInGongduolaPerform(e)
    );
  }
}
exports.NpcRideInGongduolaPerform = NpcRideInGongduolaPerform;
//# sourceMappingURL=npc-ride-in-gongduola-perform.js.map
