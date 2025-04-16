"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportTransitionWithCenterText = void 0);
const FbPlayFlow_1 = require("./FbPlayFlow");
class FbTeleportTransitionWithCenterText {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.evh = !1),
      (this.tvh = void 0);
  }
  static Create(t) {
    if (t) return new FbTeleportTransitionWithCenterText(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CenterTextFlow() {
    return (
      this.evh ||
        ((this.evh = !0),
        (this.tvh = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.centerTextFlow(),
        ))),
      this.tvh
    );
  }
}
exports.FbTeleportTransitionWithCenterText = FbTeleportTransitionWithCenterText;
//# sourceMappingURL=FbTeleportTransitionWithCenterText.js.map
