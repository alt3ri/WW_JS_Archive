"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DurabilityWorn = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DurabilityWorn {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsDurabilityWorn(t, r) {
    return (r || new DurabilityWorn()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDurabilityWorn(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new DurabilityWorn()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  slightWear() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  severeWear() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startDurabilityWorn(t) {
    t.startObject(2);
  }
  static addSlightWear(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addSevereWear(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static endDurabilityWorn(t) {
    return t.endObject();
  }
  static createDurabilityWorn(t, r, i) {
    return (
      DurabilityWorn.startDurabilityWorn(t),
      DurabilityWorn.addSlightWear(t, r),
      DurabilityWorn.addSevereWear(t, i),
      DurabilityWorn.endDurabilityWorn(t)
    );
  }
}
exports.DurabilityWorn = DurabilityWorn;
//# sourceMappingURL=durability-worn.js.map
