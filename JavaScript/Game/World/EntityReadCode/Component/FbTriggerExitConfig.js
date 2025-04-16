"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTriggerExitConfig = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbTriggerExitConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Zkh = !1),
      (this.eGh = 0),
      (this.vkh = !1),
      (this.ykh = 0),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.Bkh = !1),
      (this.qkh = 0),
      (this.tGh = !1),
      (this.iGh = !1),
      (this.L_h = !1),
      (this.A_h = void 0),
      (this.rGh = !1),
      (this.oGh = !1);
  }
  static Create(t) {
    if (t) return new FbTriggerExitConfig(t);
  }
  get ExtraRange() {
    return (
      this.Zkh ||
        ((this.Zkh = !0), (this.eGh = this.FbDataInternal.extraRange())),
      this.eGh
    );
  }
  get MaxTriggerTimes() {
    return (
      this.vkh ||
        ((this.vkh = !0), (this.ykh = this.FbDataInternal.maxTriggerTimes())),
      this.ykh
    );
  }
  get Condition() {
    return (
      this.f_h ||
        ((this.f_h = !0),
        (this.X6o = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.condition(),
        ))),
      this.X6o
    );
  }
  get MatchTypeCount() {
    return (
      this.Bkh ||
        ((this.Bkh = !0), (this.qkh = this.FbDataInternal.matchTypeCount())),
      this.qkh
    );
  }
  get ExitByNotEnterCondition() {
    return (
      this.tGh ||
        ((this.tGh = !0),
        (this.iGh = this.FbDataInternal.exitByNotEnterCondition())),
      this.iGh
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
  get DisableExecuteActionsWhenDestroy() {
    return (
      this.rGh ||
        ((this.rGh = !0),
        (this.oGh = this.FbDataInternal.disableExecuteActionsWhenDestroy())),
      this.oGh
    );
  }
}
exports.FbTriggerExitConfig = FbTriggerExitConfig;
//# sourceMappingURL=FbTriggerExitConfig.js.map
