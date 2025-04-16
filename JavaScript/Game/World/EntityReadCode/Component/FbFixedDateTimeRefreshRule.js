"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFixedDateTimeRefreshRule = void 0);
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbFixedDateTimeRefreshRule {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ZDh = !1),
      (this.eBh = 0),
      (this.tBh = !1),
      (this.iBh = 0),
      (this.rBh = !1),
      (this.oBh = 0),
      (this.nBh = !1),
      (this.sBh = 0),
      (this.f_h = !1),
      (this.X6o = void 0);
  }
  static Create(t) {
    if (t) return new FbFixedDateTimeRefreshRule(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Hours() {
    return (
      this.ZDh || ((this.ZDh = !0), (this.eBh = this.FbDataInternal.hours())),
      this.eBh
    );
  }
  get Minutes() {
    return (
      this.tBh || ((this.tBh = !0), (this.iBh = this.FbDataInternal.minutes())),
      this.iBh
    );
  }
  get Seconds() {
    return (
      this.rBh || ((this.rBh = !0), (this.oBh = this.FbDataInternal.seconds())),
      this.oBh
    );
  }
  get RefreshRate() {
    return (
      this.nBh ||
        ((this.nBh = !0), (this.sBh = this.FbDataInternal.refreshRate())),
      this.sBh
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
}
exports.FbFixedDateTimeRefreshRule = FbFixedDateTimeRefreshRule;
//# sourceMappingURL=FbFixedDateTimeRefreshRule.js.map
