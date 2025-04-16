"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckSystemStateCondition = void 0);
const UnionCheckSystemStateHelper_1 = require("./UnionCheckSystemStateHelper");
class FbCheckSystemStateCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckSystemStateCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Config() {
    var t, e;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (t = this.FbDataInternal.configType()),
        (e =
          UnionCheckSystemStateHelper_1.UnionCheckSystemStateHelper.GetUnionCheckSystemStateObject(
            t,
          ))) &&
        (this.TAe =
          UnionCheckSystemStateHelper_1.UnionCheckSystemStateHelper.ReadUnionCheckSystemState(
            t,
            this.FbDataInternal.config(e),
          )),
      this.TAe
    );
  }
}
exports.FbCheckSystemStateCondition = FbCheckSystemStateCondition;
//# sourceMappingURL=FbCheckSystemStateCondition.js.map
