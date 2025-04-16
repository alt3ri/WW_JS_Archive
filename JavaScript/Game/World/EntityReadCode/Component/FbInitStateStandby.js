"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInitStateStandby = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbInitStateStandby {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bvh = !1),
      (this.Lvh = void 0),
      (this.ich = !1),
      (this.rch = void 0),
      (this.YRh = !1),
      (this.zRh = void 0);
  }
  static Create(t) {
    if (t) return new FbInitStateStandby(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get StandbyTags() {
    if (!this.bvh) {
      (this.bvh = !0), (this.Lvh = new Array());
      var i = this.FbDataInternal.standbyTagsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.Lvh.push(this.FbDataInternal.standbyTags(t));
    }
    return this.Lvh;
  }
  get Conditions() {
    if (!this.ich) {
      (this.ich = !0), (this.rch = new Array());
      var i = this.FbDataInternal.conditionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.conditions(
            t,
            new fb_condition_1.ConditionGroup(),
          );
          this.rch.push(FbConditionGroup_1.FbConditionGroup.Create(s));
        }
    }
    return this.rch;
  }
  get Wander() {
    return (
      this.YRh || ((this.YRh = !0), (this.zRh = this.FbDataInternal.wander())),
      this.zRh
    );
  }
}
exports.FbInitStateStandby = FbInitStateStandby;
//# sourceMappingURL=FbInitStateStandby.js.map
