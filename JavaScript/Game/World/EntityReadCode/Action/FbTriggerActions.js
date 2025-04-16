"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTriggerActions = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("./FbActionInfo");
class FbTriggerActions {
  constructor(t) {
    (this.FbDataInternal = t), (this.L_h = !1), (this.A_h = void 0);
  }
  static Create(t) {
    if (t) return new FbTriggerActions(t);
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var r = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(r));
        }
    }
    return this.A_h;
  }
}
exports.FbTriggerActions = FbTriggerActions;
//# sourceMappingURL=FbTriggerActions.js.map
