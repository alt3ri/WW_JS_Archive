"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbConditionBubbleData = void 0);
const FbBubbleData_1 = require("../Action/FbBubbleData"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbConditionBubbleData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.F_h = !1),
      (this.N_h = void 0);
  }
  static Create(t) {
    if (t) return new FbConditionBubbleData(t);
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
  get Flow() {
    return (
      this.F_h ||
        ((this.F_h = !0),
        (this.N_h = FbBubbleData_1.FbBubbleData.Create(
          this.FbDataInternal.flow(),
        ))),
      this.N_h
    );
  }
}
exports.FbConditionBubbleData = FbConditionBubbleData;
//# sourceMappingURL=FbConditionBubbleData.js.map
