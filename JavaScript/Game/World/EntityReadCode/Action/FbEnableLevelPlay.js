"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnableLevelPlay = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbEnableLevelPlayConfig_1 = require("./FbEnableLevelPlayConfig");
class FbEnableLevelPlay {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.Gvh = !1),
      (this.Ovh = void 0),
      (this.AQl = !1),
      (this.xQl = void 0);
  }
  static Create(e) {
    if (e) return new FbEnableLevelPlay(e);
  }
  get Configs() {
    if (!this.Gvh) {
      (this.Gvh = !0), (this.Ovh = new Array());
      var t = this.FbDataInternal.configsLength();
      if (t)
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.configs(
            e,
            new fb_action_1.EnableLevelPlayConfig(),
          );
          this.Ovh.push(
            FbEnableLevelPlayConfig_1.FbEnableLevelPlayConfig.Create(i),
          );
        }
    }
    return this.Ovh;
  }
  get TargetPlayer() {
    return (
      this.AQl ||
        ((this.AQl = !0), (this.xQl = this.FbDataInternal.targetPlayer())),
      this.xQl
    );
  }
}
exports.FbEnableLevelPlay = FbEnableLevelPlay;
//# sourceMappingURL=FbEnableLevelPlay.js.map
