"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCreateStageConfig = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbCreateBulletConfig_1 = require("./FbCreateBulletConfig");
class FbCreateStageConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ijh = !1),
      (this.rjh = 0),
      (this.ojh = !1),
      (this.njh = void 0),
      (this.L_h = !1),
      (this.A_h = void 0);
  }
  static Create(t) {
    if (t) return new FbCreateStageConfig(t);
  }
  get PerformDuration() {
    return (
      this.ijh ||
        ((this.ijh = !0), (this.rjh = this.FbDataInternal.performDuration())),
      this.rjh
    );
  }
  get BulletConfig() {
    return (
      this.ojh ||
        ((this.ojh = !0),
        (this.njh = FbCreateBulletConfig_1.FbCreateBulletConfig.Create(
          this.FbDataInternal.bulletConfig(),
        ))),
      this.njh
    );
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
    }
    return this.A_h;
  }
}
exports.FbCreateStageConfig = FbCreateStageConfig;
//# sourceMappingURL=FbCreateStageConfig.js.map
