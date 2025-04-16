"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RemoveGuestCharacter = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RemoveGuestCharacter {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsRemoveGuestCharacter(e, t) {
    return (t || new RemoveGuestCharacter()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRemoveGuestCharacter(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RemoveGuestCharacter()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  guestCharacterId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startRemoveGuestCharacter(e) {
    e.startObject(1);
  }
  static addGuestCharacterId(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static endRemoveGuestCharacter(e) {
    return e.endObject();
  }
  static createRemoveGuestCharacter(e, t) {
    return (
      RemoveGuestCharacter.startRemoveGuestCharacter(e),
      RemoveGuestCharacter.addGuestCharacterId(e, t),
      RemoveGuestCharacter.endRemoveGuestCharacter(e)
    );
  }
}
exports.RemoveGuestCharacter = RemoveGuestCharacter;
//# sourceMappingURL=remove-guest-character.js.map
