"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbExploreSkillPullGiant = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbExploreSkillPullGiant {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.FWh = !1),
      (this.NWh = 0),
      (this.L_h = !1),
      (this.A_h = void 0);
  }
  static Create(t) {
    if (t) return new FbExploreSkillPullGiant(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PullTime() {
    return (
      this.FWh ||
        ((this.FWh = !0), (this.NWh = this.FbDataInternal.pullTime())),
      this.NWh
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
exports.FbExploreSkillPullGiant = FbExploreSkillPullGiant;
//# sourceMappingURL=FbExploreSkillPullGiant.js.map
