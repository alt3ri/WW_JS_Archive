"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFixAction = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbFixAction {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.nZh = !1),
      (this.sZh = void 0),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.aZh = !1),
      (this.hZh = void 0),
      (this.lZh = !1),
      (this._Zh = !1);
  }
  static Create(i) {
    if (i) return new FbFixAction(i);
  }
  get Timing() {
    return (
      this.nZh || ((this.nZh = !0), (this.sZh = this.FbDataInternal.timing())),
      this.sZh
    );
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
  get ThenActions() {
    if (!this.aZh) {
      (this.aZh = !0), (this.hZh = new Array());
      var t = this.FbDataInternal.thenActionsLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var s = this.FbDataInternal.thenActions(
            i,
            new fb_action_1.ActionInfo(),
          );
          this.hZh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.hZh;
  }
  get Period() {
    return (
      this.lZh || ((this.lZh = !0), (this._Zh = this.FbDataInternal.period())),
      this._Zh
    );
  }
}
exports.FbFixAction = FbFixAction;
//# sourceMappingURL=FbFixAction.js.map
