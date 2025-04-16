"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcRideInAutoGongduolaPerform = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NpcRideInAutoGongduolaPerform {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsNpcRideInAutoGongduolaPerform(t, o) {
    return (o || new NpcRideInAutoGongduolaPerform()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcRideInAutoGongduolaPerform(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new NpcRideInAutoGongduolaPerform()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  montage(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  static startNpcRideInAutoGongduolaPerform(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addMontage(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static endNpcRideInAutoGongduolaPerform(t) {
    return t.endObject();
  }
  static createNpcRideInAutoGongduolaPerform(t, o, e) {
    return (
      NpcRideInAutoGongduolaPerform.startNpcRideInAutoGongduolaPerform(t),
      NpcRideInAutoGongduolaPerform.addType(t, o),
      NpcRideInAutoGongduolaPerform.addMontage(t, e),
      NpcRideInAutoGongduolaPerform.endNpcRideInAutoGongduolaPerform(t)
    );
  }
}
exports.NpcRideInAutoGongduolaPerform = NpcRideInAutoGongduolaPerform;
//# sourceMappingURL=npc-ride-in-auto-gongduola-perform.js.map
