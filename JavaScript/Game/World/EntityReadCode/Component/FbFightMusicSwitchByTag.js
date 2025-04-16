"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFightMusicSwitchByTag = void 0);
class FbFightMusicSwitchByTag {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.pwh = !1),
      (this.vwh = void 0),
      (this.Iwh = !1),
      (this.Twh = void 0);
  }
  static Create(t) {
    if (t) return new FbFightMusicSwitchByTag(t);
  }
  get FightMusic() {
    return (
      this.pwh ||
        ((this.pwh = !0), (this.vwh = this.FbDataInternal.fightMusic())),
      this.vwh
    );
  }
  get ActivateTag() {
    return (
      this.Iwh ||
        ((this.Iwh = !0), (this.Twh = this.FbDataInternal.activateTag())),
      this.Twh
    );
  }
}
exports.FbFightMusicSwitchByTag = FbFightMusicSwitchByTag;
//# sourceMappingURL=FbFightMusicSwitchByTag.js.map
