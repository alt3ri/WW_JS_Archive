"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcStandbyShowFinitely = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  npc_standby_show_finitely_info_js_1 = require("../fb-component/npc-standby-show-finitely-info.js");
class NpcStandbyShowFinitely {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsNpcStandbyShowFinitely(t, i) {
    return (i || new NpcStandbyShowFinitely()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcStandbyShowFinitely(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new NpcStandbyShowFinitely()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  playMode(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  montages(t, i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (
          i ||
          new npc_standby_show_finitely_info_js_1.NpcStandbyShowFinitelyInfo()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  montagesLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startNpcStandbyShowFinitely(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPlayMode(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addMontages(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createMontagesVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startMontagesVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endNpcStandbyShowFinitely(t) {
    return t.endObject();
  }
  static createNpcStandbyShowFinitely(t, i, e, n) {
    return (
      NpcStandbyShowFinitely.startNpcStandbyShowFinitely(t),
      NpcStandbyShowFinitely.addType(t, i),
      NpcStandbyShowFinitely.addPlayMode(t, e),
      NpcStandbyShowFinitely.addMontages(t, n),
      NpcStandbyShowFinitely.endNpcStandbyShowFinitely(t)
    );
  }
}
exports.NpcStandbyShowFinitely = NpcStandbyShowFinitely;
//# sourceMappingURL=npc-standby-show-finitely.js.map
