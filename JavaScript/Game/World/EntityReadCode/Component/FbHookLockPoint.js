"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHookLockPoint = void 0);
const FbCameraGaze_1 = require("../Action/FbCameraGaze"),
  FbGazeNextPointAfterInteract_1 = require("./FbGazeNextPointAfterInteract"),
  UnionHookInteractConfigHelper_1 = require("./UnionHookInteractConfigHelper"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup"),
  UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper"),
  FbSphereTriggerShape_1 = require("../Shape/FbSphereTriggerShape");
class FbHookLockPoint {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.M_h = !1),
      (this.E_h = void 0),
      (this.qDh = !1),
      (this.PAe = void 0),
      (this.EP_ = !1),
      (this.IP_ = !1),
      (this.nGh = !1),
      (this.sGh = !1),
      (this.aGh = !1),
      (this.hGh = void 0),
      (this.lGh = !1),
      (this._Gh = void 0),
      (this.cGh = !1),
      (this.uGh = !1),
      (this.dGh = !1),
      (this.mGh = void 0),
      (this.CGh = !1),
      (this.gGh = !1),
      (this.fGh = !1),
      (this.pGh = 0),
      (this.W__ = !1),
      (this.Q__ = void 0),
      (this.vGh = !1),
      (this.yGh = 0),
      (this.SGh = !1),
      (this.MGh = !1),
      (this.EGh = !1),
      (this.IGh = !1),
      (this.TGh = !1),
      (this.bGh = void 0);
  }
  static Create(t) {
    if (t) return new FbHookLockPoint(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Range() {
    return (
      this.M_h ||
        ((this.M_h = !0),
        (this.E_h = FbSphereTriggerShape_1.FbSphereTriggerShape.Create(
          this.FbDataInternal.range(),
        ))),
      this.E_h
    );
  }
  get MatchRoleOption() {
    if (!this.qDh) {
      (this.qDh = !0), (this.PAe = new Array());
      var i = this.FbDataInternal.matchRoleOptionLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchRoleOptionType(t),
            s =
              UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.GetUnionMatchRoleOptionObject(
                e,
              );
          s &&
            void 0 !==
              (e =
                UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.ReadUnionMatchRoleOption(
                  e,
                  this.FbDataInternal.matchRoleOption(t, s),
                )) &&
            this.PAe.push(e);
        }
    }
    return this.PAe;
  }
  get IgnorePlayCollision() {
    return (
      this.EP_ ||
        ((this.EP_ = !0),
        (this.IP_ = this.FbDataInternal.ignorePlayCollision())),
      this.IP_
    );
  }
  get UseRangeComponent() {
    return (
      this.nGh ||
        ((this.nGh = !0), (this.sGh = this.FbDataInternal.useRangeComponent())),
      this.sGh
    );
  }
  get CameraGaze() {
    return (
      this.aGh ||
        ((this.aGh = !0),
        (this.hGh = FbCameraGaze_1.FbCameraGaze.Create(
          this.FbDataInternal.cameraGaze(),
        ))),
      this.hGh
    );
  }
  get GazeNextPointAfterInteract() {
    return (
      this.lGh ||
        ((this.lGh = !0),
        (this._Gh =
          FbGazeNextPointAfterInteract_1.FbGazeNextPointAfterInteract.Create(
            this.FbDataInternal.gazeNextPointAfterInteract(),
          ))),
      this._Gh
    );
  }
  get InheritSpeed() {
    return (
      this.cGh ||
        ((this.cGh = !0), (this.uGh = this.FbDataInternal.inheritSpeed())),
      this.uGh
    );
  }
  get NormalEffect() {
    return (
      this.dGh ||
        ((this.dGh = !0), (this.mGh = this.FbDataInternal.normalEffect())),
      this.mGh
    );
  }
  get IsClimb() {
    return (
      this.CGh || ((this.CGh = !0), (this.gGh = this.FbDataInternal.isClimb())),
      this.gGh
    );
  }
  get PlayerStateRestritionId() {
    return (
      this.fGh ||
        ((this.fGh = !0),
        (this.pGh = this.FbDataInternal.playerStateRestritionId())),
      this.pGh
    );
  }
  get HookEnableCondition() {
    return (
      this.W__ ||
        ((this.W__ = !0),
        (this.Q__ = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.hookEnableCondition(),
        ))),
      this.Q__
    );
  }
  get HookLockCd() {
    return (
      this.vGh ||
        ((this.vGh = !0), (this.yGh = this.FbDataInternal.hookLockCd())),
      this.yGh
    );
  }
  get IsDestroyedSelf() {
    return (
      this.SGh ||
        ((this.SGh = !0), (this.MGh = this.FbDataInternal.isDestroyedSelf())),
      this.MGh
    );
  }
  get IsHideSelf() {
    return (
      this.EGh ||
        ((this.EGh = !0), (this.IGh = this.FbDataInternal.isHideSelf())),
      this.IGh
    );
  }
  get HookInteractConfig() {
    var t, i;
    return (
      !this.TGh &&
        ((this.TGh = !0),
        (t = this.FbDataInternal.hookInteractConfigType()),
        (i =
          UnionHookInteractConfigHelper_1.UnionHookInteractConfigHelper.GetUnionHookInteractConfigObject(
            t,
          ))) &&
        (this.bGh =
          UnionHookInteractConfigHelper_1.UnionHookInteractConfigHelper.ReadUnionHookInteractConfig(
            t,
            this.FbDataInternal.hookInteractConfig(i),
          )),
      this.bGh
    );
  }
}
exports.FbHookLockPoint = FbHookLockPoint;
//# sourceMappingURL=FbHookLockPoint.js.map
