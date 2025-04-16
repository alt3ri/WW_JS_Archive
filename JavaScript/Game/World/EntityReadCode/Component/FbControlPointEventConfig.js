"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbControlPointEventConfig = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbControlPointEventConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Afh = !1),
      (this.V_i = 0),
      (this.gHh = !1),
      (this.fHh = void 0),
      (this.pHh = !1),
      (this.vHh = void 0),
      (this.yHh = !1),
      (this.SHh = void 0),
      (this.MHh = !1),
      (this.EHh = void 0);
  }
  static Create(t) {
    if (t) return new FbControlPointEventConfig(t);
  }
  get Index() {
    return (
      this.Afh || ((this.Afh = !0), (this.V_i = this.FbDataInternal.index())),
      this.V_i
    );
  }
  get LeftInEventActions() {
    if (!this.gHh) {
      (this.gHh = !0), (this.fHh = new Array());
      var i = this.FbDataInternal.leftInEventActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.leftInEventActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.fHh.push(FbActionInfo_1.FbActionInfo.Create(n));
        }
    }
    return this.fHh;
  }
  get LeftOutEventActions() {
    if (!this.pHh) {
      (this.pHh = !0), (this.vHh = new Array());
      var i = this.FbDataInternal.leftOutEventActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.leftOutEventActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.vHh.push(FbActionInfo_1.FbActionInfo.Create(n));
        }
    }
    return this.vHh;
  }
  get RightInEventActions() {
    if (!this.yHh) {
      (this.yHh = !0), (this.SHh = new Array());
      var i = this.FbDataInternal.rightInEventActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.rightInEventActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.SHh.push(FbActionInfo_1.FbActionInfo.Create(n));
        }
    }
    return this.SHh;
  }
  get RightOutEventActions() {
    if (!this.MHh) {
      (this.MHh = !0), (this.EHh = new Array());
      var i = this.FbDataInternal.rightOutEventActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.rightOutEventActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.EHh.push(FbActionInfo_1.FbActionInfo.Create(n));
        }
    }
    return this.EHh;
  }
}
exports.FbControlPointEventConfig = FbControlPointEventConfig;
//# sourceMappingURL=FbControlPointEventConfig.js.map
