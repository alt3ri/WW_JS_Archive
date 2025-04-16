"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCallByCondition = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("./FbActionInfo"),
  FbConditions_1 = require("./FbConditions");
class FbCallByCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ich = !1),
      (this.rch = void 0),
      (this.och = !1),
      (this.nch = void 0),
      (this.sch = !1),
      (this.ach = void 0);
  }
  static Create(t) {
    if (t) return new FbCallByCondition(t);
  }
  get Conditions() {
    return (
      this.ich ||
        ((this.ich = !0),
        (this.rch = FbConditions_1.FbConditions.Create(
          this.FbDataInternal.conditions(),
        ))),
      this.rch
    );
  }
  get TrueActions() {
    if (!this.och) {
      (this.och = !0), (this.nch = new Array());
      var i = this.FbDataInternal.trueActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.trueActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.nch.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.nch;
  }
  get FalseActions() {
    if (!this.sch) {
      (this.sch = !0), (this.ach = new Array());
      var i = this.FbDataInternal.falseActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.falseActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.ach.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.ach;
  }
}
exports.FbCallByCondition = FbCallByCondition;
//# sourceMappingURL=FbCallByCondition.js.map
