"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityBatchRefreshComponent = void 0);
const UnionEntityBatchRefreshHelper_1 = require("./UnionEntityBatchRefreshHelper"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbEntityBatchRefreshComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.KS1 = !1),
      (this.XS1 = void 0),
      (this.YS1 = !1),
      (this.zS1 = void 0),
      (this.JS1 = !1),
      (this.ZS1 = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityBatchRefreshComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get StartCondition() {
    return (
      this.KS1 ||
        ((this.KS1 = !0),
        (this.XS1 = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.startCondition(),
        ))),
      this.XS1
    );
  }
  get EndCondition() {
    return (
      this.YS1 ||
        ((this.YS1 = !0),
        (this.zS1 = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.endCondition(),
        ))),
      this.zS1
    );
  }
  get EntityBatchRefresh() {
    var t, i;
    return (
      !this.JS1 &&
        ((this.JS1 = !0),
        (t = this.FbDataInternal.entityBatchRefreshType()),
        (i =
          UnionEntityBatchRefreshHelper_1.UnionEntityBatchRefreshHelper.GetUnionEntityBatchRefreshObject(
            t,
          ))) &&
        (this.ZS1 =
          UnionEntityBatchRefreshHelper_1.UnionEntityBatchRefreshHelper.ReadUnionEntityBatchRefresh(
            t,
            this.FbDataInternal.entityBatchRefresh(i),
          )),
      this.ZS1
    );
  }
}
exports.FbEntityBatchRefreshComponent = FbEntityBatchRefreshComponent;
//# sourceMappingURL=FbEntityBatchRefreshComponent.js.map
