"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbConditionGroup = void 0);
const UnionCondition2Helper_1 = require("./UnionCondition2Helper");
class FbConditionGroup {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ich = !1),
      (this.rch = void 0);
  }
  static Create(i) {
    if (i) return new FbConditionGroup(i);
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
          var o = this.FbDataInternal.conditionsExtType(i),
            n =
              UnionCondition2Helper_1.UnionCondition2Helper.GetUnionCondition2Object(
                o,
              ),
            o =
              UnionCondition2Helper_1.UnionCondition2Helper.ReadUnionCondition2(
                o,
                this.FbDataInternal.conditions(i, n),
              );
          void 0 !== o && this.rch.push(o);
        }
    }
    return this.rch;
  }
}
exports.FbConditionGroup = FbConditionGroup;
//# sourceMappingURL=FbConditionGroup.js.map
