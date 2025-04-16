"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckDirectionCondition = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCheckDirectionCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tdh = !1),
      (this.idh = void 0),
      (this.aJh = !1),
      (this.hJh = 0);
  }
  static Create(t) {
    if (t) return new FbCheckDirectionCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Direction() {
    return (
      this.tdh ||
        ((this.tdh = !0),
        (this.idh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.direction(),
        ))),
      this.idh
    );
  }
  get AngleInterval() {
    return (
      this.aJh ||
        ((this.aJh = !0), (this.hJh = this.FbDataInternal.angleInterval())),
      this.hJh
    );
  }
}
exports.FbCheckDirectionCondition = FbCheckDirectionCondition;
//# sourceMappingURL=FbCheckDirectionCondition.js.map
