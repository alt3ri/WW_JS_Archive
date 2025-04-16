"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcUiInteractOnHandInItem = void 0);
const FbPlayFlow_1 = require("../Action/FbPlayFlow");
class FbNpcUiInteractOnHandInItem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.K4h = !1),
      (this.$4h = void 0),
      (this.X4h = !1),
      (this.Y4h = void 0),
      (this.S6h = !1),
      (this.M6h = void 0),
      (this.Z4h = !1),
      (this.e6h = void 0),
      (this.E6h = !1),
      (this.I6h = void 0);
  }
  static Create(t) {
    if (t) return new FbNpcUiInteractOnHandInItem(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EnterMontage() {
    return (
      this.K4h ||
        ((this.K4h = !0), (this.$4h = this.FbDataInternal.enterMontage())),
      this.$4h
    );
  }
  get StandByMontage() {
    return (
      this.X4h ||
        ((this.X4h = !0), (this.Y4h = this.FbDataInternal.standByMontage())),
      this.Y4h
    );
  }
  get HandInFailedMontage() {
    return (
      this.S6h ||
        ((this.S6h = !0),
        (this.M6h = this.FbDataInternal.handInFailedMontage())),
      this.M6h
    );
  }
  get EnterFlow() {
    return (
      this.Z4h ||
        ((this.Z4h = !0),
        (this.e6h = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.enterFlow(),
        ))),
      this.e6h
    );
  }
  get HandInFailedFlow() {
    return (
      this.E6h ||
        ((this.E6h = !0),
        (this.I6h = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.handInFailedFlow(),
        ))),
      this.I6h
    );
  }
}
exports.FbNpcUiInteractOnHandInItem = FbNpcUiInteractOnHandInItem;
//# sourceMappingURL=FbNpcUiInteractOnHandInItem.js.map
