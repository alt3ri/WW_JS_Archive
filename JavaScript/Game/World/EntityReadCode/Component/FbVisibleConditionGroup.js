"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVisibleConditionGroup = void 0);
const UnionVisibleConditionHelper_1 = require("../Condition/UnionVisibleConditionHelper");
class FbVisibleConditionGroup {
  constructor(i) {
    (this.FbDataInternal = i), (this.ich = !1), (this.rch = void 0);
  }
  static Create(i) {
    if (i) return new FbVisibleConditionGroup(i);
  }
  get Conditions() {
    if (!this.ich) {
      (this.ich = !0), (this.rch = new Array());
      var o = this.FbDataInternal.conditionsLength();
      if (o)
        for (let i = 0; i < o; ++i) {
          var t = this.FbDataInternal.conditionsType(i),
            e =
              UnionVisibleConditionHelper_1.UnionVisibleConditionHelper.GetUnionVisibleConditionObject(
                t,
              );
          e &&
            void 0 !==
              (t =
                UnionVisibleConditionHelper_1.UnionVisibleConditionHelper.ReadUnionVisibleCondition(
                  t,
                  this.FbDataInternal.conditions(i, e),
                )) &&
            this.rch.push(t);
        }
    }
    return this.rch;
  }
}
exports.FbVisibleConditionGroup = FbVisibleConditionGroup;
//# sourceMappingURL=FbVisibleConditionGroup.js.map
