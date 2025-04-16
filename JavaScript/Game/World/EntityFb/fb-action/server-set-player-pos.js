"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ServerSetPlayerPos = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  pos_a_js_1 = require("../fb-action/pos-a.js");
class ServerSetPlayerPos {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsServerSetPlayerPos(e, r) {
    return (r || new ServerSetPlayerPos()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsServerSetPlayerPos(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ServerSetPlayerPos()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  pos(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r
      ? (e || new pos_a_js_1.PosA()).__init(
          this.bb.__indirect(this.bb_pos + r),
          this.bb,
        )
      : void 0;
  }
  static startServerSetPlayerPos(e) {
    e.startObject(1);
  }
  static addPos(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static endServerSetPlayerPos(e) {
    return e.endObject();
  }
  static createServerSetPlayerPos(e, r) {
    return (
      ServerSetPlayerPos.startServerSetPlayerPos(e),
      ServerSetPlayerPos.addPos(e, r),
      ServerSetPlayerPos.endServerSetPlayerPos(e)
    );
  }
}
exports.ServerSetPlayerPos = ServerSetPlayerPos;
//# sourceMappingURL=server-set-player-pos.js.map
