"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetBattleTags = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  set_battle_tag_config_js_1 = require("../fb-action/set-battle-tag-config.js");
class SetBattleTags {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetBattleTags(t, e) {
    return (e || new SetBattleTags()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetBattleTags(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetBattleTags()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  configs(t, e) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (e || new set_battle_tag_config_js_1.SetBattleTagConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  configsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startSetBattleTags(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addConfigs(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createConfigsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startConfigsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endSetBattleTags(t) {
    return t.endObject();
  }
  static createSetBattleTags(t, e, s) {
    return (
      SetBattleTags.startSetBattleTags(t),
      SetBattleTags.addType(t, e),
      SetBattleTags.addConfigs(t, s),
      SetBattleTags.endSetBattleTags(t)
    );
  }
}
exports.SetBattleTags = SetBattleTags;
//# sourceMappingURL=set-battle-tags.js.map
