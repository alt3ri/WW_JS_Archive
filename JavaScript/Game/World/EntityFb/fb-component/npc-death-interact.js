"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcDeathInteract = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  montage_id_js_1 = require("../fb-action/montage-id.js");
class NpcDeathInteract {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsNpcDeathInteract(t, e) {
    return (e || new NpcDeathInteract()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcDeathInteract(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new NpcDeathInteract()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  montage(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (t || new montage_id_js_1.MontageId()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  materialDa(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startNpcDeathInteract(t) {
    t.startObject(2);
  }
  static addMontage(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMaterialDa(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endNpcDeathInteract(t) {
    return t.endObject();
  }
  static createNpcDeathInteract(t, e, a) {
    return (
      NpcDeathInteract.startNpcDeathInteract(t),
      NpcDeathInteract.addMontage(t, e),
      NpcDeathInteract.addMaterialDa(t, a),
      NpcDeathInteract.endNpcDeathInteract(t)
    );
  }
}
exports.NpcDeathInteract = NpcDeathInteract;
//# sourceMappingURL=npc-death-interact.js.map
