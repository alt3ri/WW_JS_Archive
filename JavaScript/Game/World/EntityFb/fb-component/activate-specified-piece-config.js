"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivateSpecifiedPieceConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  jigsaw_config_js_1 = require("../fb-action/jigsaw-config.js");
class ActivateSpecifiedPieceConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, e) {
    return (this.bb_pos = i), (this.bb = e), this;
  }
  static getRootAsActivateSpecifiedPieceConfig(i, e) {
    return (e || new ActivateSpecifiedPieceConfig()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsActivateSpecifiedPieceConfig(i, e) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ActivateSpecifiedPieceConfig()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  jigsaw(i) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (i || new jigsaw_config_js_1.JigsawConfig()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  selfState(i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, i) : void 0;
  }
  static startActivateSpecifiedPieceConfig(i) {
    i.startObject(2);
  }
  static addJigsaw(i, e) {
    i.addFieldOffset(0, e, 0);
  }
  static addSelfState(i, e) {
    i.addFieldOffset(1, e, 0);
  }
  static endActivateSpecifiedPieceConfig(i) {
    return i.endObject();
  }
  static createActivateSpecifiedPieceConfig(i, e, t) {
    return (
      ActivateSpecifiedPieceConfig.startActivateSpecifiedPieceConfig(i),
      ActivateSpecifiedPieceConfig.addJigsaw(i, e),
      ActivateSpecifiedPieceConfig.addSelfState(i, t),
      ActivateSpecifiedPieceConfig.endActivateSpecifiedPieceConfig(i)
    );
  }
}
exports.ActivateSpecifiedPieceConfig = ActivateSpecifiedPieceConfig;
//# sourceMappingURL=activate-specified-piece-config.js.map
