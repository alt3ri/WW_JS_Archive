"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetTimeScale = void 0);
const UnionSetTimeScaleHelper_1 = require("./UnionSetTimeScaleHelper");
class FbSetTimeScale {
  constructor(e) {
    (this.FbDataInternal = e), (this.bSh = !1), (this.TAe = void 0);
  }
  static Create(e) {
    if (e) return new FbSetTimeScale(e);
  }
  get Config() {
    var e, t;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (e = this.FbDataInternal.configType()),
        (t =
          UnionSetTimeScaleHelper_1.UnionSetTimeScaleHelper.GetUnionSetTimeScaleObject(
            e,
          ))) &&
        (this.TAe =
          UnionSetTimeScaleHelper_1.UnionSetTimeScaleHelper.ReadUnionSetTimeScale(
            e,
            this.FbDataInternal.config(t),
          )),
      this.TAe
    );
  }
}
exports.FbSetTimeScale = FbSetTimeScale;
//# sourceMappingURL=FbSetTimeScale.js.map
