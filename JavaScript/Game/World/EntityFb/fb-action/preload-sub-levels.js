"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadSubLevels = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PreloadSubLevels {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsPreloadSubLevels(e, t) {
    return (t || new PreloadSubLevels()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPreloadSubLevels(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new PreloadSubLevels()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  preloadLevels(e, t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * e, t)
      : void 0;
  }
  preloadLevelsLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startPreloadSubLevels(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addPreloadLevels(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createPreloadLevelsVector(t, s) {
    t.startVector(4, s.length, 4);
    for (let e = s.length - 1; 0 <= e; e--) t.addOffset(s[e]);
    return t.endVector();
  }
  static startPreloadLevelsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endPreloadSubLevels(e) {
    return e.endObject();
  }
  static createPreloadSubLevels(e, t, s) {
    return (
      PreloadSubLevels.startPreloadSubLevels(e),
      PreloadSubLevels.addType(e, t),
      PreloadSubLevels.addPreloadLevels(e, s),
      PreloadSubLevels.endPreloadSubLevels(e)
    );
  }
}
exports.PreloadSubLevels = PreloadSubLevels;
//# sourceMappingURL=preload-sub-levels.js.map
