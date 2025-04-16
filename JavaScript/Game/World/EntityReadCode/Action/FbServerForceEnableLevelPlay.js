"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbServerForceEnableLevelPlay = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbEnableLevelPlayConfig_1 = require("./FbEnableLevelPlayConfig");
class FbServerForceEnableLevelPlay {
  constructor(e) {
    (this.FbDataInternal = e), (this.Gvh = !1), (this.Ovh = void 0);
  }
  static Create(e) {
    if (e) return new FbServerForceEnableLevelPlay(e);
  }
  get Configs() {
    if (!this.Gvh) {
      (this.Gvh = !0), (this.Ovh = new Array());
      var t = this.FbDataInternal.configsLength();
      if (t)
        for (let e = 0; e < t; ++e) {
          var r = this.FbDataInternal.configs(
            e,
            new fb_action_1.EnableLevelPlayConfig(),
          );
          this.Ovh.push(
            FbEnableLevelPlayConfig_1.FbEnableLevelPlayConfig.Create(r),
          );
        }
    }
    return this.Ovh;
  }
}
exports.FbServerForceEnableLevelPlay = FbServerForceEnableLevelPlay;
//# sourceMappingURL=FbServerForceEnableLevelPlay.js.map
