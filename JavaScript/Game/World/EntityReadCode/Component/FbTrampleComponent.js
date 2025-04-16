"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTrampleComponent = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbEnterLeaveRadius_1 = require("../Common/FbEnterLeaveRadius"),
  FbEntityMatch_1 = require("./FbEntityMatch"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup"),
  UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper");
class FbTrampleComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.Ukh = !1),
      (this.Dkh = void 0),
      (this.qDh = !1),
      (this.PAe = void 0),
      (this.QVh = !1),
      (this.KVh = 0),
      (this.gch = !1),
      (this.fch = 0),
      (this.$Vh = !1),
      (this.XVh = !1),
      (this.YVh = !1),
      (this.zVh = void 0),
      (this.JVh = !1),
      (this.ZVh = !1),
      (this.e4h = !1),
      (this.t4h = void 0),
      (this.i4h = !1),
      (this.r4h = void 0);
  }
  static Create(t) {
    if (t) return new FbTrampleComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
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
  get DownTime() {
    return (
      this.QVh ||
        ((this.QVh = !0), (this.KVh = this.FbDataInternal.downTime())),
      this.KVh
    );
  }
  get StayTime() {
    return (
      this.gch ||
        ((this.gch = !0), (this.fch = this.FbDataInternal.stayTime())),
      this.fch
    );
  }
  get IsResetGear() {
    return (
      this.$Vh ||
        ((this.$Vh = !0), (this.XVh = this.FbDataInternal.isResetGear())),
      this.XVh
    );
  }
  get ShowLandTipRadius() {
    return (
      this.YVh ||
        ((this.YVh = !0),
        (this.zVh = FbEnterLeaveRadius_1.FbEnterLeaveRadius.Create(
          this.FbDataInternal.showLandTipRadius(),
        ))),
      this.zVh
    );
  }
  get StopTeleControlMove() {
    return (
      this.JVh ||
        ((this.JVh = !0),
        (this.ZVh = this.FbDataInternal.stopTeleControlMove())),
      this.ZVh
    );
  }
  get EnterActions() {
    if (!this.e4h) {
      (this.e4h = !0), (this.t4h = new Array());
      var i = this.FbDataInternal.enterActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.enterActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.t4h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.t4h;
  }
  get ExitActions() {
    if (!this.i4h) {
      (this.i4h = !0), (this.r4h = new Array());
      var i = this.FbDataInternal.exitActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.exitActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.r4h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.r4h;
  }
}
exports.FbTrampleComponent = FbTrampleComponent;
//# sourceMappingURL=FbTrampleComponent.js.map
