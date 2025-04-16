"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSlashHook = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSlashHook {
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
      (this.rOc = !1),
      (this.oOc = void 0),
      (this.nOc = !1),
      (this.sOc = void 0),
      (this.jAc = !1),
      (this.HAc = void 0),
      (this.ug1 = !1),
      (this.dg1 = !1);
  }
  static Create(t) {
    if (t) return new FbSlashHook(t);
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
  get SlashAngleType() {
    return (
      this.rOc ||
        ((this.rOc = !0), (this.oOc = this.FbDataInternal.slashAngleType())),
      this.oOc
    );
  }
  get DefaultSlashDir() {
    return (
      this.nOc ||
        ((this.nOc = !0), (this.sOc = this.FbDataInternal.defaultSlashDir())),
      this.sOc
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
exports.FbSlashHook = FbSlashHook;
//# sourceMappingURL=FbSlashHook.js.map
