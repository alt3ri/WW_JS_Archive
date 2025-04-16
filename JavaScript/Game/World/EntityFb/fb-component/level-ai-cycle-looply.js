"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiCycleLooply = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LevelAiCycleLooply {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsLevelAiCycleLooply(e, t) {
    return (t || new LevelAiCycleLooply()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsLevelAiCycleLooply(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new LevelAiCycleLooply()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  isCircle() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startLevelAiCycleLooply(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addIsCircle(e, t) {
    e.addFieldInt8(1, +t, 0);
  }
  static endLevelAiCycleLooply(e) {
    return e.endObject();
  }
  static createLevelAiCycleLooply(e, t, l) {
    return (
      LevelAiCycleLooply.startLevelAiCycleLooply(e),
      LevelAiCycleLooply.addType(e, t),
      LevelAiCycleLooply.addIsCircle(e, l),
      LevelAiCycleLooply.endLevelAiCycleLooply(e)
    );
  }
}
exports.LevelAiCycleLooply = LevelAiCycleLooply;
//# sourceMappingURL=level-ai-cycle-looply.js.map
