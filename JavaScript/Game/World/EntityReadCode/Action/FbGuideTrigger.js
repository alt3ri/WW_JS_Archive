"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGuideTrigger = void 0);
const UnionCondition2Helper_1 = require("../Condition/UnionCondition2Helper");
class FbGuideTrigger {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ich = !1),
      (this.rch = void 0),
      (this.guh = !1),
      (this.fuh = 0);
  }
  static Create(i) {
    if (i) return new FbGuideTrigger(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Conditions() {
    if (!this.ich) {
      (this.ich = !0), (this.rch = new Array());
      var t = this.FbDataInternal.conditionsLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.conditionsExtType(i),
            s =
              UnionCondition2Helper_1.UnionCondition2Helper.GetUnionCondition2Object(
                e,
              ),
            e =
              UnionCondition2Helper_1.UnionCondition2Helper.ReadUnionCondition2(
                e,
                this.FbDataInternal.conditions(i, s),
              );
          void 0 !== e && this.rch.push(e);
        }
    }
    return this.rch;
  }
  get GuideId() {
    return (
      this.guh || ((this.guh = !0), (this.fuh = this.FbDataInternal.guideId())),
      this.fuh
    );
  }
}
exports.FbGuideTrigger = FbGuideTrigger;
//# sourceMappingURL=FbGuideTrigger.js.map
