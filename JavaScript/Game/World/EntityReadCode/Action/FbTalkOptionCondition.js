"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTalkOptionCondition = void 0);
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbTalkOptionCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ich = !1),
      (this.rch = void 0);
  }
  static Create(t) {
    if (t) return new FbTalkOptionCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Conditions() {
    return (
      this.ich ||
        ((this.ich = !0),
        (this.rch = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.conditions(),
        ))),
      this.rch
    );
  }
}
exports.FbTalkOptionCondition = FbTalkOptionCondition;
//# sourceMappingURL=FbTalkOptionCondition.js.map
