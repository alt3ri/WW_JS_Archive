"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcUiInteractOnGramophone = void 0);
const FbPlayFlow_1 = require("../Action/FbPlayFlow");
class FbNpcUiInteractOnGramophone {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.K4h = !1),
      (this.$4h = void 0),
      (this.X4h = !1),
      (this.Y4h = void 0),
      (this.C6h = !1),
      (this.g6h = void 0),
      (this.a6h = !1),
      (this.h6h = void 0),
      (this.Z4h = !1),
      (this.e6h = void 0),
      (this.f6h = !1),
      (this.p6h = void 0),
      (this.v6h = !1),
      (this.y6h = void 0);
  }
  static Create(t) {
    if (t) return new FbNpcUiInteractOnGramophone(t);
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
  get SwitchMusicMontage() {
    return (
      this.C6h ||
        ((this.C6h = !0),
        (this.g6h = this.FbDataInternal.switchMusicMontage())),
      this.g6h
    );
  }
  get ExitMontage() {
    return (
      this.a6h ||
        ((this.a6h = !0), (this.h6h = this.FbDataInternal.exitMontage())),
      this.h6h
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
  get FailedFlow() {
    return (
      this.f6h ||
        ((this.f6h = !0),
        (this.p6h = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.failedFlow(),
        ))),
      this.p6h
    );
  }
  get SuccessFlow() {
    return (
      this.v6h ||
        ((this.v6h = !0),
        (this.y6h = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.successFlow(),
        ))),
      this.y6h
    );
  }
}
exports.FbNpcUiInteractOnGramophone = FbNpcUiInteractOnGramophone;
//# sourceMappingURL=FbNpcUiInteractOnGramophone.js.map
