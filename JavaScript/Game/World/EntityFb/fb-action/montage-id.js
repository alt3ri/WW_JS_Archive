"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MontageId = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MontageId {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsMontageId(t, e) {
    return (e || new MontageId()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMontageId(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new MontageId()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  montageId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isAbp() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startMontageId(t) {
    t.startObject(2);
  }
  static addMontageId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsAbp(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endMontageId(t) {
    return t.endObject();
  }
  static createMontageId(t, e, s) {
    return (
      MontageId.startMontageId(t),
      MontageId.addMontageId(t, e),
      MontageId.addIsAbp(t, s),
      MontageId.endMontageId(t)
    );
  }
}
exports.MontageId = MontageId;
//# sourceMappingURL=montage-id.js.map
