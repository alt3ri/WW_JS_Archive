"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RemovePreloadResourceTrialCharacter = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RemovePreloadResourceTrialCharacter {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(r, e) {
    return (this.bb_pos = r), (this.bb = e), this;
  }
  static getRootAsRemovePreloadResourceTrialCharacter(r, e) {
    return (e || new RemovePreloadResourceTrialCharacter()).__init(
      r.readInt32(r.position()) + r.position(),
      r,
    );
  }
  static getSizePrefixedRootAsRemovePreloadResourceTrialCharacter(r, e) {
    return (
      r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RemovePreloadResourceTrialCharacter()).__init(
        r.readInt32(r.position()) + r.position(),
        r,
      )
    );
  }
  type(r) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, r) : void 0;
  }
  characterGroup(r) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * r) : 0;
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
  static startRemovePreloadResourceTrialCharacter(r) {
    r.startObject(2);
  }
  static addType(r, e) {
    r.addFieldOffset(0, e, 0);
  }
  static addCharacterGroup(r, e) {
    r.addFieldOffset(1, e, 0);
  }
  static createCharacterGroupVector(e, t) {
    e.startVector(4, t.length, 4);
    for (let r = t.length - 1; 0 <= r; r--) e.addInt32(t[r]);
    return e.endVector();
  }
  static startCharacterGroupVector(r, e) {
    r.startVector(4, e, 4);
  }
  static endRemovePreloadResourceTrialCharacter(r) {
    return r.endObject();
  }
  static createRemovePreloadResourceTrialCharacter(r, e, t) {
    return (
      RemovePreloadResourceTrialCharacter.startRemovePreloadResourceTrialCharacter(
        r,
      ),
      RemovePreloadResourceTrialCharacter.addType(r, e),
      RemovePreloadResourceTrialCharacter.addCharacterGroup(r, t),
      RemovePreloadResourceTrialCharacter.endRemovePreloadResourceTrialCharacter(
        r,
      )
    );
  }
}
exports.RemovePreloadResourceTrialCharacter =
  RemovePreloadResourceTrialCharacter;
//# sourceMappingURL=remove-preload-resource-trial-character.js.map
