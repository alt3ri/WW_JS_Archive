"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTurntableControlComponent = void 0);
const UnionTurntableControllerHelper_1 = require("./UnionTurntableControllerHelper");
class FbTurntableControlComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(t) {
    if (t) return new FbTurntableControlComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Config() {
    var t, e;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (t = this.FbDataInternal.configType()),
        (e =
          UnionTurntableControllerHelper_1.UnionTurntableControllerHelper.GetUnionTurntableControllerObject(
            t,
          ))) &&
        (this.TAe =
          UnionTurntableControllerHelper_1.UnionTurntableControllerHelper.ReadUnionTurntableController(
            t,
            this.FbDataInternal.config(e),
          )),
      this.TAe
    );
  }
}
exports.FbTurntableControlComponent = FbTurntableControlComponent;
//# sourceMappingURL=FbTurntableControlComponent.js.map
