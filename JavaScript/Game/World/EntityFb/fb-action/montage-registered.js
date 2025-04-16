"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MontageRegistered = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  montage_id_js_1 = require("../fb-action/montage-id.js");
class MontageRegistered {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsMontageRegistered(t, e) {
    return (e || new MontageRegistered()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMontageRegistered(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new MontageRegistered()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  montageId(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new montage_id_js_1.MontageId()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startMontageRegistered(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMontageId(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endMontageRegistered(t) {
    return t.endObject();
  }
}
exports.MontageRegistered = MontageRegistered;
//# sourceMappingURL=montage-registered.js.map
