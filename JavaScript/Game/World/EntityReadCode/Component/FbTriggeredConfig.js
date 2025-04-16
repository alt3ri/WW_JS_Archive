"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTriggeredConfig = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbTriggeredConfig {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.vkh = !1),
      (this.ykh = 0),
      (this.L_h = !1),
      (this.A_h = void 0),
      (this.jkh = !1),
      (this.Hkh = !1);
  }
  static Create(i) {
    if (i) return new FbTriggeredConfig(i);
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
  get MaxTriggerTimes() {
    return (
      this.vkh ||
        ((this.vkh = !0), (this.ykh = this.FbDataInternal.maxTriggerTimes())),
      this.ykh
    );
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var t = this.FbDataInternal.actionsLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var s = this.FbDataInternal.actions(i, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.A_h;
  }
  get OnlineDisableTip() {
    return (
      this.jkh ||
        ((this.jkh = !0), (this.Hkh = this.FbDataInternal.onlineDisableTip())),
      this.Hkh
    );
  }
}
exports.FbTriggeredConfig = FbTriggeredConfig;
//# sourceMappingURL=FbTriggeredConfig.js.map
