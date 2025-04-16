"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGroupDestroyListenConfig = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbGroupDestroyListenConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.GAc = !1),
      (this.FAc = void 0),
      (this.NAc = !1),
      (this.VAc = void 0);
  }
  static Create(t) {
    if (t) return new FbGroupDestroyListenConfig(t);
  }
  get GroupType() {
    return (
      this.GAc ||
        ((this.GAc = !0), (this.FAc = this.FbDataInternal.groupType())),
      this.FAc
    );
  }
  get OnTriggerActions() {
    if (!this.NAc) {
      (this.NAc = !0), (this.VAc = new Array());
      var i = this.FbDataInternal.onTriggerActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.onTriggerActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.VAc.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.VAc;
  }
}
exports.FbGroupDestroyListenConfig = FbGroupDestroyListenConfig;
//# sourceMappingURL=FbGroupDestroyListenConfig.js.map
