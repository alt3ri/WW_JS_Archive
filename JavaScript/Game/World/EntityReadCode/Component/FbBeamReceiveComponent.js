"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBeamReceiveComponent = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbBeamReceiveComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.I_h = !1),
      (this.y6o = 0),
      (this.bKh = !1),
      (this.LKh = void 0),
      (this.AKh = !1),
      (this.xKh = void 0),
      (this.RKh = !1),
      (this.wKh = void 0);
  }
  static Create(t) {
    if (t) return new FbBeamReceiveComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
  get BeginActions() {
    if (!this.bKh) {
      (this.bKh = !0), (this.LKh = new Array());
      var i = this.FbDataInternal.beginActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.beginActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.LKh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.LKh;
  }
  get CompleteActions() {
    if (!this.AKh) {
      (this.AKh = !0), (this.xKh = new Array());
      var i = this.FbDataInternal.completeActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.completeActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.xKh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.xKh;
  }
  get StopActions() {
    if (!this.RKh) {
      (this.RKh = !0), (this.wKh = new Array());
      var i = this.FbDataInternal.stopActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.stopActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.wKh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.wKh;
  }
}
exports.FbBeamReceiveComponent = FbBeamReceiveComponent;
//# sourceMappingURL=FbBeamReceiveComponent.js.map
