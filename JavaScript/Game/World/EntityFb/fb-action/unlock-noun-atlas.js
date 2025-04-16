"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnlockNounAtlas = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockNounAtlas {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsUnlockNounAtlas(t, s) {
    return (s || new UnlockNounAtlas()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsUnlockNounAtlas(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new UnlockNounAtlas()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startUnlockNounAtlas(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addId(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static endUnlockNounAtlas(t) {
    return t.endObject();
  }
  static createUnlockNounAtlas(t, s, n) {
    return (
      UnlockNounAtlas.startUnlockNounAtlas(t),
      UnlockNounAtlas.addType(t, s),
      UnlockNounAtlas.addId(t, n),
      UnlockNounAtlas.endUnlockNounAtlas(t)
    );
  }
}
exports.UnlockNounAtlas = UnlockNounAtlas;
//# sourceMappingURL=unlock-noun-atlas.js.map
