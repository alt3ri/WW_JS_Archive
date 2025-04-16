"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMovementPointHook = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbMovementPointHook {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.BGh = !1),
      (this.qGh = void 0),
      (this.kGh = !1),
      (this.GGh = void 0),
      (this.OGh = !1),
      (this.FGh = void 0);
  }
  static Create(t) {
    if (t) return new FbMovementPointHook(t);
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
          var o = this.FbDataInternal.hookActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.qGh.push(FbActionInfo_1.FbActionInfo.Create(o));
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
          var o = this.FbDataInternal.exitHookActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.GGh.push(FbActionInfo_1.FbActionInfo.Create(o));
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
          var o = this.FbDataInternal.finishActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.FGh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
    }
    return this.FGh;
  }
}
exports.FbMovementPointHook = FbMovementPointHook;
//# sourceMappingURL=FbMovementPointHook.js.map
