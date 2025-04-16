"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayGuestCartethyia = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayGuestCartethyia {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPlayGuestCartethyia(t, e) {
    return (e || new PlayGuestCartethyia()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPlayGuestCartethyia(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PlayGuestCartethyia()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startPlayGuestCartethyia(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPlayGuestCartethyia(t) {
    return t.endObject();
  }
  static createPlayGuestCartethyia(t, e) {
    return (
      PlayGuestCartethyia.startPlayGuestCartethyia(t),
      PlayGuestCartethyia.addType(t, e),
      PlayGuestCartethyia.endPlayGuestCartethyia(t)
    );
  }
}
exports.PlayGuestCartethyia = PlayGuestCartethyia;
//# sourceMappingURL=play-guest-cartethyia.js.map
