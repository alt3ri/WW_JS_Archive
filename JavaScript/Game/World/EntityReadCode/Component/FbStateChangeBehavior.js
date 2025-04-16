"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStateChangeBehavior = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbConditionAction_1 = require("./FbConditionAction"),
  FbDelayChangeState_1 = require("./FbDelayChangeState");
class FbStateChangeBehavior {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.QUh = !1),
      (this.KUh = void 0),
      (this.$Uh = !1),
      (this.XUh = void 0),
      (this.YUh = !1),
      (this.zUh = void 0);
  }
  static Create(t) {
    if (t) return new FbStateChangeBehavior(t);
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get Action() {
    if (!this.QUh) {
      (this.QUh = !0), (this.KUh = new Array());
      var i = this.FbDataInternal.actionLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.action(t, new fb_action_1.ActionInfo());
          this.KUh.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
    }
    return this.KUh;
  }
  get DelayChangeState() {
    return (
      this.$Uh ||
        ((this.$Uh = !0),
        (this.XUh = FbDelayChangeState_1.FbDelayChangeState.Create(
          this.FbDataInternal.delayChangeState(),
        ))),
      this.XUh
    );
  }
  get ConditionAction() {
    if (!this.YUh) {
      (this.YUh = !0), (this.zUh = new Array());
      var i = this.FbDataInternal.conditionActionLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.conditionAction(
            t,
            new fb_component_1.ConditionAction(),
          );
          this.zUh.push(FbConditionAction_1.FbConditionAction.Create(e));
        }
    }
    return this.zUh;
  }
}
exports.FbStateChangeBehavior = FbStateChangeBehavior;
//# sourceMappingURL=FbStateChangeBehavior.js.map
