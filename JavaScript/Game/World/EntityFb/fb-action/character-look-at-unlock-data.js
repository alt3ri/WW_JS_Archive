"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterLookAtUnlockData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CharacterLookAtUnlockData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsCharacterLookAtUnlockData(t, a) {
    return (a || new CharacterLookAtUnlockData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCharacterLookAtUnlockData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new CharacterLookAtUnlockData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startCharacterLookAtUnlockData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldInt8(0, a, 0);
  }
  static endCharacterLookAtUnlockData(t) {
    return t.endObject();
  }
  static createCharacterLookAtUnlockData(t, a) {
    return (
      CharacterLookAtUnlockData.startCharacterLookAtUnlockData(t),
      CharacterLookAtUnlockData.addType(t, a),
      CharacterLookAtUnlockData.endCharacterLookAtUnlockData(t)
    );
  }
}
exports.CharacterLookAtUnlockData = CharacterLookAtUnlockData;
//# sourceMappingURL=character-look-at-unlock-data.js.map
