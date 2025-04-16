"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetBattleTags = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbSetBattleTagConfig_1 = require("./FbSetBattleTagConfig");
class FbSetBattleTags {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Gvh = !1),
      (this.Ovh = void 0);
  }
  static Create(t) {
    if (t) return new FbSetBattleTags(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Configs() {
    if (!this.Gvh) {
      (this.Gvh = !0), (this.Ovh = new Array());
      var e = this.FbDataInternal.configsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.configs(
            t,
            new fb_action_1.SetBattleTagConfig(),
          );
          this.Ovh.push(FbSetBattleTagConfig_1.FbSetBattleTagConfig.Create(i));
        }
    }
    return this.Ovh;
  }
}
exports.FbSetBattleTags = FbSetBattleTags;
//# sourceMappingURL=FbSetBattleTags.js.map
