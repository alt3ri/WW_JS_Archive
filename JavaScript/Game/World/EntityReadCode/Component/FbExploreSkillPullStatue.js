"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbExploreSkillPullStatue = void 0);
const FbCategoryMatchingCondition_1 = require("./FbCategoryMatchingCondition");
class FbExploreSkillPullStatue {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.VWh = !1),
      (this.jWh = 0);
  }
  static Create(t) {
    if (t) return new FbExploreSkillPullStatue(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Condition() {
    return (
      this.f_h ||
        ((this.f_h = !0),
        (this.X6o =
          FbCategoryMatchingCondition_1.FbCategoryMatchingCondition.Create(
            this.FbDataInternal.condition(),
          ))),
      this.X6o
    );
  }
  get StatueInteractPointId() {
    return (
      this.VWh ||
        ((this.VWh = !0),
        (this.jWh = this.FbDataInternal.statueInteractPointId())),
      this.jWh
    );
  }
}
exports.FbExploreSkillPullStatue = FbExploreSkillPullStatue;
//# sourceMappingURL=FbExploreSkillPullStatue.js.map
