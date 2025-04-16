"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayVarContext = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LevelPlayVarContext {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsLevelPlayVarContext(t, e) {
    return (e || new LevelPlayVarContext()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLevelPlayVarContext(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new LevelPlayVarContext()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startLevelPlayVarContext(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endLevelPlayVarContext(t) {
    return t.endObject();
  }
  static createLevelPlayVarContext(t, e, a) {
    return (
      LevelPlayVarContext.startLevelPlayVarContext(t),
      LevelPlayVarContext.addType(t, e),
      LevelPlayVarContext.addId(t, a),
      LevelPlayVarContext.endLevelPlayVarContext(t)
    );
  }
}
exports.LevelPlayVarContext = LevelPlayVarContext;
//# sourceMappingURL=level-play-var-context.js.map
