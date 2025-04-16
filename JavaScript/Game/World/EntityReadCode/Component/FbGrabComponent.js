"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGrabComponent = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbGrabComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.sDh = !1),
      (this.aDh = void 0),
      (this.hDh = !1),
      (this.lDh = 0),
      (this._Dh = !1),
      (this.cDh = 0);
  }
  static Create(t) {
    if (t) return new FbGrabComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get GrabPos() {
    return (
      this.sDh ||
        ((this.sDh = !0),
        (this.aDh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.grabPos(),
        ))),
      this.aDh
    );
  }
  get ThrowPow() {
    return (
      this.hDh ||
        ((this.hDh = !0), (this.lDh = this.FbDataInternal.throwPow())),
      this.lDh
    );
  }
  get ThrowHight() {
    return (
      this._Dh ||
        ((this._Dh = !0), (this.cDh = this.FbDataInternal.throwHight())),
      this.cDh
    );
  }
}
exports.FbGrabComponent = FbGrabComponent;
//# sourceMappingURL=FbGrabComponent.js.map
