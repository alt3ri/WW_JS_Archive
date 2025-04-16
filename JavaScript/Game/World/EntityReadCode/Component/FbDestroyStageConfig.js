"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDestroyStageConfig = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbDestroyStageConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ijh = !1),
      (this.rjh = 0),
      (this.p0h = !1),
      (this.nXs = 0),
      (this.L_h = !1),
      (this.A_h = void 0);
  }
  static Create(t) {
    if (t) return new FbDestroyStageConfig(t);
  }
  get PerformDuration() {
    return (
      this.ijh ||
        ((this.ijh = !0), (this.rjh = this.FbDataInternal.performDuration())),
      this.rjh
    );
  }
  get BulletId() {
    return (
      this.p0h ||
        ((this.p0h = !0), (this.nXs = Number(this.FbDataInternal.bulletId()))),
      this.nXs
    );
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.A_h;
  }
}
exports.FbDestroyStageConfig = FbDestroyStageConfig;
//# sourceMappingURL=FbDestroyStageConfig.js.map
