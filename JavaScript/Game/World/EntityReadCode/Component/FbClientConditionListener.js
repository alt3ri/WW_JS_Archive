"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbClientConditionListener = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbClientConditionListener {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.L_h = !1),
      (this.A_h = void 0),
      (this.XYh = !1),
      (this.YYh = void 0);
  }
  static Create(t) {
    if (t) return new FbClientConditionListener(t);
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
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(n));
        }
    }
    return this.A_h;
  }
  get SendSelfEvent() {
    return (
      this.XYh ||
        ((this.XYh = !0), (this.YYh = this.FbDataInternal.sendSelfEvent())),
      this.YYh
    );
  }
}
exports.FbClientConditionListener = FbClientConditionListener;
//# sourceMappingURL=FbClientConditionListener.js.map
