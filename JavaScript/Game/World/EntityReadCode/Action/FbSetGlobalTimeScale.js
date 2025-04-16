"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetGlobalTimeScale = void 0);
const UnionSetGlobalTimeScaleHelper_1 = require("./UnionSetGlobalTimeScaleHelper");
class FbSetGlobalTimeScale {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(e) {
    if (e) return new FbSetGlobalTimeScale(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Config() {
    var e, t;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (e = this.FbDataInternal.configType()),
        (t =
          UnionSetGlobalTimeScaleHelper_1.UnionSetGlobalTimeScaleHelper.GetUnionSetGlobalTimeScaleObject(
            e,
          ))) &&
        (this.TAe =
          UnionSetGlobalTimeScaleHelper_1.UnionSetGlobalTimeScaleHelper.ReadUnionSetGlobalTimeScale(
            e,
            this.FbDataInternal.config(t),
          )),
      this.TAe
    );
  }
}
exports.FbSetGlobalTimeScale = FbSetGlobalTimeScale;
//# sourceMappingURL=FbSetGlobalTimeScale.js.map
