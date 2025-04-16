"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbConditionAction = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbConditionAction {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.QUh = !1),
      (this.KUh = void 0);
  }
  static Create(i) {
    if (i) return new FbConditionAction(i);
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
  get Action() {
    if (!this.QUh) {
      (this.QUh = !0), (this.KUh = new Array());
      var t = this.FbDataInternal.actionLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var o = this.FbDataInternal.action(i, new fb_action_1.ActionInfo());
          this.KUh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
    }
    return this.KUh;
  }
}
exports.FbConditionAction = FbConditionAction;
//# sourceMappingURL=FbConditionAction.js.map
