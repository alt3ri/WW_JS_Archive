"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FightMusicsSwitchByTagList = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  fight_music_switch_by_tag_js_1 = require("../fb-component/fight-music-switch-by-tag.js");
class FightMusicsSwitchByTagList {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFightMusicsSwitchByTagList(t, i) {
    return (i || new FightMusicsSwitchByTagList()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFightMusicsSwitchByTagList(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FightMusicsSwitchByTagList()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  element(t, i) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (
          i || new fight_music_switch_by_tag_js_1.FightMusicSwitchByTag()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  elementLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startFightMusicsSwitchByTagList(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addElement(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createElementVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startElementVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endFightMusicsSwitchByTagList(t) {
    return t.endObject();
  }
  static createFightMusicsSwitchByTagList(t, i, s) {
    return (
      FightMusicsSwitchByTagList.startFightMusicsSwitchByTagList(t),
      FightMusicsSwitchByTagList.addType(t, i),
      FightMusicsSwitchByTagList.addElement(t, s),
      FightMusicsSwitchByTagList.endFightMusicsSwitchByTagList(t)
    );
  }
}
exports.FightMusicsSwitchByTagList = FightMusicsSwitchByTagList;
//# sourceMappingURL=fight-musics-switch-by-tag-list.js.map
