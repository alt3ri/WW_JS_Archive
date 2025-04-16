"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityTrackControlPoint = void 0);
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbEntityTrackControlPoint {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this._Hh = !1),
      (this.cHh = void 0),
      (this.uHh = !1),
      (this.dHh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityTrackControlPoint(t);
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get LeftCondition() {
    return (
      this._Hh ||
        ((this._Hh = !0),
        (this.cHh = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.leftCondition(),
        ))),
      this.cHh
    );
  }
  get RightCondition() {
    return (
      this.uHh ||
        ((this.uHh = !0),
        (this.dHh = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.rightCondition(),
        ))),
      this.dHh
    );
  }
}
exports.FbEntityTrackControlPoint = FbEntityTrackControlPoint;
//# sourceMappingURL=FbEntityTrackControlPoint.js.map
