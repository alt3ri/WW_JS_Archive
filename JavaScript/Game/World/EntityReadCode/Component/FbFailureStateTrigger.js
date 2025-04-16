"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFailureStateTrigger = void 0);
const FbOperationsAfterEntityGroupFailure_1 = require("./FbOperationsAfterEntityGroupFailure"),
  UnionEntityGroupFailureConditionHelper_1 = require("./UnionEntityGroupFailureConditionHelper");
class FbFailureStateTrigger {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.DOh = !1),
      (this.BOh = void 0),
      (this.RVh = !1),
      (this.wVh = void 0);
  }
  static Create(i) {
    if (i) return new FbFailureStateTrigger(i);
  }
  get FailureConditions() {
    if (!this.DOh) {
      (this.DOh = !0), (this.BOh = new Array());
      var t = this.FbDataInternal.failureConditionsLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var r = this.FbDataInternal.failureConditionsType(i),
            e =
              UnionEntityGroupFailureConditionHelper_1.UnionEntityGroupFailureConditionHelper.GetUnionEntityGroupFailureConditionObject(
                r,
              );
          e &&
            void 0 !==
              (r =
                UnionEntityGroupFailureConditionHelper_1.UnionEntityGroupFailureConditionHelper.ReadUnionEntityGroupFailureCondition(
                  r,
                  this.FbDataInternal.failureConditions(i, e),
                )) &&
            this.BOh.push(r);
        }
    }
    return this.BOh;
  }
  get FailureOperations() {
    return (
      this.RVh ||
        ((this.RVh = !0),
        (this.wVh =
          FbOperationsAfterEntityGroupFailure_1.FbOperationsAfterEntityGroupFailure.Create(
            this.FbDataInternal.failureOperations(),
          ))),
      this.wVh
    );
  }
}
exports.FbFailureStateTrigger = FbFailureStateTrigger;
//# sourceMappingURL=FbFailureStateTrigger.js.map
