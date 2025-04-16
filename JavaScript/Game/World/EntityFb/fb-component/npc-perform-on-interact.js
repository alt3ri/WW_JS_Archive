"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformOnInteract = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NpcPerformOnInteract {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsNpcPerformOnInteract(t, r) {
    return (r || new NpcPerformOnInteract()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcPerformOnInteract(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new NpcPerformOnInteract()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  montage(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startNpcPerformOnInteract(t) {
    t.startObject(1);
  }
  static addMontage(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endNpcPerformOnInteract(t) {
    return t.endObject();
  }
  static createNpcPerformOnInteract(t, r) {
    return (
      NpcPerformOnInteract.startNpcPerformOnInteract(t),
      NpcPerformOnInteract.addMontage(t, r),
      NpcPerformOnInteract.endNpcPerformOnInteract(t)
    );
  }
}
exports.NpcPerformOnInteract = NpcPerformOnInteract;
//# sourceMappingURL=npc-perform-on-interact.js.map
