"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FightMusicSwitchByTag = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FightMusicSwitchByTag {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFightMusicSwitchByTag(t, i) {
    return (i || new FightMusicSwitchByTag()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFightMusicSwitchByTag(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FightMusicSwitchByTag()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  fightMusic(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  activateTag(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startFightMusicSwitchByTag(t) {
    t.startObject(2);
  }
  static addFightMusic(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addActivateTag(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endFightMusicSwitchByTag(t) {
    return t.endObject();
  }
  static createFightMusicSwitchByTag(t, i, s) {
    return (
      FightMusicSwitchByTag.startFightMusicSwitchByTag(t),
      FightMusicSwitchByTag.addFightMusic(t, i),
      FightMusicSwitchByTag.addActivateTag(t, s),
      FightMusicSwitchByTag.endFightMusicSwitchByTag(t)
    );
  }
}
exports.FightMusicSwitchByTag = FightMusicSwitchByTag;
//# sourceMappingURL=fight-music-switch-by-tag.js.map
