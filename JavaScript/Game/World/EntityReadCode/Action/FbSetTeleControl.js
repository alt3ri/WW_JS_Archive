"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetTeleControl = void 0);
const UnionSetTeleControlConfigHelper_1 = require("./UnionSetTeleControlConfigHelper");
class FbSetTeleControl {
  constructor(e) {
    (this.FbDataInternal = e), (this.bSh = !1), (this.TAe = void 0);
  }
  static Create(e) {
    if (e) return new FbSetTeleControl(e);
  }
  get Config() {
    var e, t;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (e = this.FbDataInternal.configType()),
        (t =
          UnionSetTeleControlConfigHelper_1.UnionSetTeleControlConfigHelper.GetUnionSetTeleControlConfigObject(
            e,
          ))) &&
        (this.TAe =
          UnionSetTeleControlConfigHelper_1.UnionSetTeleControlConfigHelper.ReadUnionSetTeleControlConfig(
            e,
            this.FbDataInternal.config(t),
          )),
      this.TAe
    );
  }
}
exports.FbSetTeleControl = FbSetTeleControl;
//# sourceMappingURL=FbSetTeleControl.js.map
