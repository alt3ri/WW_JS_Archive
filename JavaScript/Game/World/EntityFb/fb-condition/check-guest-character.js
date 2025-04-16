"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckGuestCharacter = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckGuestCharacter {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckGuestCharacter(t, e) {
    return (e || new CheckGuestCharacter()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckGuestCharacter(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckGuestCharacter()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  guestCharacterId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCheckGuestCharacter(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addGuestCharacterId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endCheckGuestCharacter(t) {
    return t.endObject();
  }
  static createCheckGuestCharacter(t, e, r) {
    return (
      CheckGuestCharacter.startCheckGuestCharacter(t),
      CheckGuestCharacter.addType(t, e),
      CheckGuestCharacter.addGuestCharacterId(t, r),
      CheckGuestCharacter.endCheckGuestCharacter(t)
    );
  }
}
exports.CheckGuestCharacter = CheckGuestCharacter;
//# sourceMappingURL=check-guest-character.js.map
