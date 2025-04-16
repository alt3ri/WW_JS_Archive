"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcBumpShow = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  npc_perform_bubble_js_1 = require("../fb-component/npc-perform-bubble.js");
class NpcBumpShow {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsNpcBumpShow(t, e) {
    return (e || new NpcBumpShow()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcBumpShow(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new NpcBumpShow()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  bumpBubble(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (t || new npc_perform_bubble_js_1.NpcPerformBubble()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startNpcBumpShow(t) {
    t.startObject(1);
  }
  static addBumpBubble(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endNpcBumpShow(t) {
    return t.endObject();
  }
  static createNpcBumpShow(t, e) {
    return (
      NpcBumpShow.startNpcBumpShow(t),
      NpcBumpShow.addBumpBubble(t, e),
      NpcBumpShow.endNpcBumpShow(t)
    );
  }
}
exports.NpcBumpShow = NpcBumpShow;
//# sourceMappingURL=npc-bump-show.js.map
