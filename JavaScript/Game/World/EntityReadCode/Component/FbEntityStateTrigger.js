"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityStateTrigger = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup"),
  FbEntityGroupCondition_1 = require("../Condition/FbEntityGroupCondition");
class FbEntityStateTrigger {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.MVh = !1),
      (this.EVh = void 0),
      (this.IVh = !1),
      (this.TVh = void 0),
      (this.bVh = !1),
      (this.LVh = void 0),
      (this.f_h = !1),
      (this.X6o = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityStateTrigger(t);
  }
  get GroupCondition() {
    return (
      this.MVh ||
        ((this.MVh = !0),
        (this.EVh = FbEntityGroupCondition_1.FbEntityGroupCondition.Create(
          this.FbDataInternal.groupCondition(),
        ))),
      this.EVh
    );
  }
  get SuccessActions() {
    if (!this.IVh) {
      (this.IVh = !0), (this.TVh = new Array());
      var i = this.FbDataInternal.successActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.successActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.TVh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
    }
    return this.TVh;
  }
  get FailActions() {
    if (!this.bVh) {
      (this.bVh = !0), (this.LVh = new Array());
      var i = this.FbDataInternal.failActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.failActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.LVh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
    }
    return this.LVh;
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
}
exports.FbEntityStateTrigger = FbEntityStateTrigger;
//# sourceMappingURL=FbEntityStateTrigger.js.map
