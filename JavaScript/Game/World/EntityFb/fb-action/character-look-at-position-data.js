"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterLookAtPositionData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class CharacterLookAtPositionData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsCharacterLookAtPositionData(t, o) {
    return (o || new CharacterLookAtPositionData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCharacterLookAtPositionData(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new CharacterLookAtPositionData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  pos(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + o),
          this.bb,
        )
      : void 0;
  }
  static startCharacterLookAtPositionData(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldInt8(0, o, 0);
  }
  static addPos(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static endCharacterLookAtPositionData(t) {
    return t.endObject();
  }
}
exports.CharacterLookAtPositionData = CharacterLookAtPositionData;
//# sourceMappingURL=character-look-at-position-data.js.map
