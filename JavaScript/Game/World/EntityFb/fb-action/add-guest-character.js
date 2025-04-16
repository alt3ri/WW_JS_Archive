"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddGuestCharacter = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  active_range_js_1 = require("../fb-action/active-range.js");
class AddGuestCharacter {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsAddGuestCharacter(t, e) {
    return (e || new AddGuestCharacter()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAddGuestCharacter(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new AddGuestCharacter()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  guestCharacterId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  activeRange(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new active_range_js_1.ActiveRange()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startAddGuestCharacter(t) {
    t.startObject(2);
  }
  static addGuestCharacterId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addActiveRange(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endAddGuestCharacter(t) {
    return t.endObject();
  }
}
exports.AddGuestCharacter = AddGuestCharacter;
//# sourceMappingURL=add-guest-character.js.map
