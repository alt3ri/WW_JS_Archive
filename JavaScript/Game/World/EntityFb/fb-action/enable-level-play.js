"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableLevelPlay = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  enable_level_play_config_js_1 = require("../fb-action/enable-level-play-config.js");
class EnableLevelPlay {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsEnableLevelPlay(e, t) {
    return (t || new EnableLevelPlay()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsEnableLevelPlay(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new EnableLevelPlay()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  configs(e, t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a
      ? (t || new enable_level_play_config_js_1.EnableLevelPlayConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + a) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  configsLength() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  targetPlayer(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startEnableLevelPlay(e) {
    e.startObject(2);
  }
  static addConfigs(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static createConfigsVector(t, a) {
    t.startVector(4, a.length, 4);
    for (let e = a.length - 1; 0 <= e; e--) t.addOffset(a[e]);
    return t.endVector();
  }
  static startConfigsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static addTargetPlayer(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endEnableLevelPlay(e) {
    return e.endObject();
  }
  static createEnableLevelPlay(e, t, a) {
    return (
      EnableLevelPlay.startEnableLevelPlay(e),
      EnableLevelPlay.addConfigs(e, t),
      EnableLevelPlay.addTargetPlayer(e, a),
      EnableLevelPlay.endEnableLevelPlay(e)
    );
  }
}
exports.EnableLevelPlay = EnableLevelPlay;
//# sourceMappingURL=enable-level-play.js.map
