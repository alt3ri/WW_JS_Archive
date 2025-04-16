"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RemoveTrialCharacter = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RemoveTrialCharacter {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(r, t) {
    return (this.bb_pos = r), (this.bb = t), this;
  }
  static getRootAsRemoveTrialCharacter(r, t) {
    return (t || new RemoveTrialCharacter()).__init(
      r.readInt32(r.position()) + r.position(),
      r,
    );
  }
  static getSizePrefixedRootAsRemoveTrialCharacter(r, t) {
    return (
      r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RemoveTrialCharacter()).__init(
        r.readInt32(r.position()) + r.position(),
        r,
      )
    );
  }
  characterId() {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.readInt32(this.bb_pos + r) : 0;
  }
  characterGroup(r) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb.__vector(this.bb_pos + t) + 4 * r) : 0;
  }
  characterGroupLength() {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__vector_len(this.bb_pos + r) : 0;
  }
  characterGroupArray() {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + r),
          this.bb.__vector_len(this.bb_pos + r),
        )
      : void 0;
  }
  static startRemoveTrialCharacter(r) {
    r.startObject(2);
  }
  static addCharacterId(r, t) {
    r.addFieldInt32(0, t, 0);
  }
  static addCharacterGroup(r, t) {
    r.addFieldOffset(1, t, 0);
  }
  static createCharacterGroupVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let r = e.length - 1; 0 <= r; r--) t.addInt32(e[r]);
    return t.endVector();
  }
  static startCharacterGroupVector(r, t) {
    r.startVector(4, t, 4);
  }
  static endRemoveTrialCharacter(r) {
    return r.endObject();
  }
  static createRemoveTrialCharacter(r, t, e) {
    return (
      RemoveTrialCharacter.startRemoveTrialCharacter(r),
      RemoveTrialCharacter.addCharacterId(r, t),
      RemoveTrialCharacter.addCharacterGroup(r, e),
      RemoveTrialCharacter.endRemoveTrialCharacter(r)
    );
  }
}
exports.RemoveTrialCharacter = RemoveTrialCharacter;
//# sourceMappingURL=remove-trial-character.js.map
