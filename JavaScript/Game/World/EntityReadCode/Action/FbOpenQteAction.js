"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenQteAction = void 0);
const UnionOpenQteConfigHelper_1 = require("./UnionOpenQteConfigHelper");
class FbOpenQteAction {
  constructor(e) {
    (this.FbDataInternal = e), (this.bSh = !1), (this.TAe = void 0);
  }
  static Create(e) {
    if (e) return new FbOpenQteAction(e);
  }
  get Config() {
    var e, t;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (e = this.FbDataInternal.configType()),
        (t =
          UnionOpenQteConfigHelper_1.UnionOpenQteConfigHelper.GetUnionOpenQteConfigObject(
            e,
          ))) &&
        (this.TAe =
          UnionOpenQteConfigHelper_1.UnionOpenQteConfigHelper.ReadUnionOpenQteConfig(
            e,
            this.FbDataInternal.config(t),
          )),
      this.TAe
    );
  }
}
exports.FbOpenQteAction = FbOpenQteAction;
//# sourceMappingURL=FbOpenQteAction.js.map
