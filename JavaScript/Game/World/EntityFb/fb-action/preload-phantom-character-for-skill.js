"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadPhantomCharacterForSkill = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PreloadPhantomCharacterForSkill {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(r, t) {
    return (this.bb_pos = r), (this.bb = t), this;
  }
  static getRootAsPreloadPhantomCharacterForSkill(r, t) {
    return (t || new PreloadPhantomCharacterForSkill()).__init(
      r.readInt32(r.position()) + r.position(),
      r,
    );
  }
  static getSizePrefixedRootAsPreloadPhantomCharacterForSkill(r, t) {
    return (
      r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new PreloadPhantomCharacterForSkill()).__init(
        r.readInt32(r.position()) + r.position(),
        r,
      )
    );
  }
  type(r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, r) : void 0;
  }
  id() {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.readInt32(this.bb_pos + r) : 0;
  }
  static startPreloadPhantomCharacterForSkill(r) {
    r.startObject(2);
  }
  static addType(r, t) {
    r.addFieldOffset(0, t, 0);
  }
  static addId(r, t) {
    r.addFieldInt32(1, t, 0);
  }
  static endPreloadPhantomCharacterForSkill(r) {
    return r.endObject();
  }
  static createPreloadPhantomCharacterForSkill(r, t, a) {
    return (
      PreloadPhantomCharacterForSkill.startPreloadPhantomCharacterForSkill(r),
      PreloadPhantomCharacterForSkill.addType(r, t),
      PreloadPhantomCharacterForSkill.addId(r, a),
      PreloadPhantomCharacterForSkill.endPreloadPhantomCharacterForSkill(r)
    );
  }
}
exports.PreloadPhantomCharacterForSkill = PreloadPhantomCharacterForSkill;
//# sourceMappingURL=preload-phantom-character-for-skill.js.map
