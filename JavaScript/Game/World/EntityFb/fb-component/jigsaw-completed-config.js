"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.JigsawCompletedConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class JigsawCompletedConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsJigsawCompletedConfig(t, e) {
    return (e || new JigsawCompletedConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsJigsawCompletedConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new JigsawCompletedConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  isSilentPiece() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isSilentFoundation() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startJigsawCompletedConfig(t) {
    t.startObject(2);
  }
  static addIsSilentPiece(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addIsSilentFoundation(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endJigsawCompletedConfig(t) {
    return t.endObject();
  }
  static createJigsawCompletedConfig(t, e, i) {
    return (
      JigsawCompletedConfig.startJigsawCompletedConfig(t),
      JigsawCompletedConfig.addIsSilentPiece(t, e),
      JigsawCompletedConfig.addIsSilentFoundation(t, i),
      JigsawCompletedConfig.endJigsawCompletedConfig(t)
    );
  }
}
exports.JigsawCompletedConfig = JigsawCompletedConfig;
//# sourceMappingURL=jigsaw-completed-config.js.map
