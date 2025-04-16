"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChargeSlashHook = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbChargeSlashHook {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.BGh = !1),
      (this.qGh = void 0),
      (this.kGh = !1),
      (this.GGh = void 0),
      (this.OGh = !1),
      (this.FGh = void 0),
      (this.u11 = !1),
      (this.d11 = void 0),
      (this.f11 = !1),
      (this.g11 = 0),
      (this.jAc = !1),
      (this.HAc = void 0),
      (this.ug1 = !1),
      (this.dg1 = !1);
  }
  static Create(t) {
    if (t) return new FbChargeSlashHook(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get HookActions() {
    if (!this.BGh) {
      (this.BGh = !0), (this.qGh = new Array());
      var i = this.FbDataInternal.hookActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.hookActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.qGh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.qGh;
  }
  get ExitHookActions() {
    if (!this.kGh) {
      (this.kGh = !0), (this.GGh = new Array());
      var i = this.FbDataInternal.exitHookActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.exitHookActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.GGh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.GGh;
  }
  get FinishActions() {
    if (!this.OGh) {
      (this.OGh = !0), (this.FGh = new Array());
      var i = this.FbDataInternal.finishActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.finishActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.FGh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.FGh;
  }
  get TargetEntityIds() {
    if (!this.u11) {
      (this.u11 = !0), (this.d11 = new Array());
      var i = this.FbDataInternal.targetEntityIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.d11.push(this.FbDataInternal.targetEntityIds(t));
    }
    return this.d11;
  }
  get MaxRandomDelayTime() {
    return (
      this.f11 ||
        ((this.f11 = !0),
        (this.g11 = this.FbDataInternal.maxRandomDelayTime())),
      this.g11
    );
  }
  get CharacterLookAt() {
    return (
      this.jAc ||
        ((this.jAc = !0),
        (this.HAc = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.characterLookAt(),
        ))),
      this.HAc
    );
  }
  get IsAdjustCameraConfig() {
    return (
      this.ug1 ||
        ((this.ug1 = !0),
        (this.dg1 = this.FbDataInternal.isAdjustCameraConfig())),
      this.dg1
    );
  }
}
exports.FbChargeSlashHook = FbChargeSlashHook;
//# sourceMappingURL=FbChargeSlashHook.js.map
