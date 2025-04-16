"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTriggerComponent = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbEntityMatch_1 = require("./FbEntityMatch"),
  FbTriggerExitConfig_1 = require("./FbTriggerExitConfig"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup"),
  UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper");
class FbTriggerComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Ukh = !1),
      (this.Dkh = void 0),
      (this.vkh = !1),
      (this.ykh = 0),
      (this.Bkh = !1),
      (this.qkh = 0),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.L_h = !1),
      (this.A_h = void 0),
      (this.kkh = !1),
      (this.Gkh = void 0),
      (this.qDh = !1),
      (this.PAe = void 0),
      (this.Okh = !1),
      (this.Fkh = !1),
      (this.Nkh = !1),
      (this.Vkh = !1),
      (this.jkh = !1),
      (this.Hkh = !1),
      (this.dD_ = !1),
      (this.mD_ = !1);
  }
  static Create(t) {
    if (t) return new FbTriggerComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Match() {
    return (
      this.Ukh ||
        ((this.Ukh = !0),
        (this.Dkh = FbEntityMatch_1.FbEntityMatch.Create(
          this.FbDataInternal.match(),
        ))),
      this.Dkh
    );
  }
  get MaxTriggerTimes() {
    return (
      this.vkh ||
        ((this.vkh = !0), (this.ykh = this.FbDataInternal.maxTriggerTimes())),
      this.ykh
    );
  }
  get MatchTypeCount() {
    return (
      this.Bkh ||
        ((this.Bkh = !0), (this.qkh = this.FbDataInternal.matchTypeCount())),
      this.qkh
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
  get ExitConfig() {
    return (
      this.kkh ||
        ((this.kkh = !0),
        (this.Gkh = FbTriggerExitConfig_1.FbTriggerExitConfig.Create(
          this.FbDataInternal.exitConfig(),
        ))),
      this.Gkh
    );
  }
  get MatchRoleOption() {
    if (!this.qDh) {
      (this.qDh = !0), (this.PAe = new Array());
      var i = this.FbDataInternal.matchRoleOptionLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.matchRoleOptionType(t),
            h =
              UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.GetUnionMatchRoleOptionObject(
                s,
              );
          h &&
            void 0 !==
              (s =
                UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.ReadUnionMatchRoleOption(
                  s,
                  this.FbDataInternal.matchRoleOption(t, h),
                )) &&
            this.PAe.push(s);
        }
    }
    return this.PAe;
  }
  get ChangeRoleTrigger() {
    return (
      this.Okh ||
        ((this.Okh = !0), (this.Fkh = this.FbDataInternal.changeRoleTrigger())),
      this.Fkh
    );
  }
  get ClientPrePerformance() {
    return (
      this.Nkh ||
        ((this.Nkh = !0),
        (this.Vkh = this.FbDataInternal.clientPrePerformance())),
      this.Vkh
    );
  }
  get OnlineDisableTip() {
    return (
      this.jkh ||
        ((this.jkh = !0), (this.Hkh = this.FbDataInternal.onlineDisableTip())),
      this.Hkh
    );
  }
  get OnlineAutoExit() {
    return (
      this.dD_ ||
        ((this.dD_ = !0), (this.mD_ = this.FbDataInternal.onlineAutoExit())),
      this.mD_
    );
  }
}
exports.FbTriggerComponent = FbTriggerComponent;
//# sourceMappingURL=FbTriggerComponent.js.map
