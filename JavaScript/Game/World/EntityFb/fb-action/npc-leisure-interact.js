"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcLeisureInteract = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_npc_leisure_interact_op_js_1 = require("../fb-action/union-npc-leisure-interact-op.js");
class NpcLeisureInteract {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsNpcLeisureInteract(t, e) {
    return (e || new NpcLeisureInteract()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcLeisureInteract(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new NpcLeisureInteract()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_npc_leisure_interact_op_js_1.UnionNpcLeisureInteractOp.NONE;
  }
  option(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startNpcLeisureInteract(t) {
    t.startObject(2);
  }
  static addOptionType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_npc_leisure_interact_op_js_1.UnionNpcLeisureInteractOp.NONE,
    );
  }
  static addOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endNpcLeisureInteract(t) {
    return t.endObject();
  }
  static createNpcLeisureInteract(t, e, r) {
    return (
      NpcLeisureInteract.startNpcLeisureInteract(t),
      NpcLeisureInteract.addOptionType(t, e),
      NpcLeisureInteract.addOption(t, r),
      NpcLeisureInteract.endNpcLeisureInteract(t)
    );
  }
}
exports.NpcLeisureInteract = NpcLeisureInteract;
//# sourceMappingURL=npc-leisure-interact.js.map
