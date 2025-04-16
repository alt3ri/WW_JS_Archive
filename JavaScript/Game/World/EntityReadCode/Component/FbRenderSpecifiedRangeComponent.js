"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRenderSpecifiedRangeComponent = void 0);
const UnionRenderSpecifiedRangeConfigHelper_1 = require("./UnionRenderSpecifiedRangeConfigHelper"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbRenderSpecifiedRangeComponent {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.qKh = !1),
      (this.kKh = void 0);
  }
  static Create(e) {
    if (e) return new FbRenderSpecifiedRangeComponent(e);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
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
  get RenderConfig() {
    var e, i;
    return (
      !this.qKh &&
        ((this.qKh = !0),
        (e = this.FbDataInternal.renderConfigType()),
        (i =
          UnionRenderSpecifiedRangeConfigHelper_1.UnionRenderSpecifiedRangeConfigHelper.GetUnionRenderSpecifiedRangeConfigObject(
            e,
          ))) &&
        (this.kKh =
          UnionRenderSpecifiedRangeConfigHelper_1.UnionRenderSpecifiedRangeConfigHelper.ReadUnionRenderSpecifiedRangeConfig(
            e,
            this.FbDataInternal.renderConfig(i),
          )),
      this.kKh
    );
  }
}
exports.FbRenderSpecifiedRangeComponent = FbRenderSpecifiedRangeComponent;
//# sourceMappingURL=FbRenderSpecifiedRangeComponent.js.map
