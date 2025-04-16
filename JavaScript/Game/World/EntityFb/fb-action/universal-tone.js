"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UniversalTone = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UniversalTone {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsUniversalTone(e, t) {
    return (t || new UniversalTone()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsUniversalTone(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new UniversalTone()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  universalToneId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  timberId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startUniversalTone(e) {
    e.startObject(2);
  }
  static addUniversalToneId(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addTimberId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endUniversalTone(e) {
    return e.endObject();
  }
  static createUniversalTone(e, t, s) {
    return (
      UniversalTone.startUniversalTone(e),
      UniversalTone.addUniversalToneId(e, t),
      UniversalTone.addTimberId(e, s),
      UniversalTone.endUniversalTone(e)
    );
  }
}
exports.UniversalTone = UniversalTone;
//# sourceMappingURL=universal-tone.js.map
