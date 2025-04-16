"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFightMusicsSwitchByTagList = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbFightMusicSwitchByTag_1 = require("./FbFightMusicSwitchByTag");
class FbFightMusicsSwitchByTagList {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Mwh = !1),
      (this.Ewh = void 0);
  }
  static Create(t) {
    if (t) return new FbFightMusicsSwitchByTagList(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Element() {
    if (!this.Mwh) {
      (this.Mwh = !0), (this.Ewh = new Array());
      var i = this.FbDataInternal.elementLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.element(
            t,
            new fb_component_1.FightMusicSwitchByTag(),
          );
          this.Ewh.push(
            FbFightMusicSwitchByTag_1.FbFightMusicSwitchByTag.Create(s),
          );
        }
    }
    return this.Ewh;
  }
}
exports.FbFightMusicsSwitchByTagList = FbFightMusicsSwitchByTagList;
//# sourceMappingURL=FbFightMusicsSwitchByTagList.js.map
