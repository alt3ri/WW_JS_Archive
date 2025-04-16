"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbExecAlertSystemAction = void 0);
const UnionAlertSystemOptionHelper_1 = require("./UnionAlertSystemOptionHelper");
class FbExecAlertSystemAction {
  constructor(t) {
    (this.FbDataInternal = t), (this.s_h = !1), (this.Hye = void 0);
  }
  static Create(t) {
    if (t) return new FbExecAlertSystemAction(t);
  }
  get Option() {
    var t, e;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (t = this.FbDataInternal.optionType()),
        (e =
          UnionAlertSystemOptionHelper_1.UnionAlertSystemOptionHelper.GetUnionAlertSystemOptionObject(
            t,
          ))) &&
        (this.Hye =
          UnionAlertSystemOptionHelper_1.UnionAlertSystemOptionHelper.ReadUnionAlertSystemOption(
            t,
            this.FbDataInternal.option(e),
          )),
      this.Hye
    );
  }
}
exports.FbExecAlertSystemAction = FbExecAlertSystemAction;
//# sourceMappingURL=FbExecAlertSystemAction.js.map
