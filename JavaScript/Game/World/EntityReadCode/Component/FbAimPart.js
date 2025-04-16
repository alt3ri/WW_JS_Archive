"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAimPart = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbAimPart {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.dOh = !1),
      (this.z8o = void 0),
      (this.Kdh = !1),
      (this.$dh = void 0),
      (this.mOh = !1),
      (this.COh = 0),
      (this.gOh = !1),
      (this.fOh = 0),
      (this.pOh = !1),
      (this.vOh = 0),
      (this.yOh = !1),
      (this.SOh = 0),
      (this.MOh = !1),
      (this.EOh = 0);
  }
  static Create(t) {
    if (t) return new FbAimPart(t);
  }
  get BoneName() {
    return (
      this.dOh ||
        ((this.dOh = !0), (this.z8o = this.FbDataInternal.boneName())),
      this.z8o
    );
  }
  get Offset() {
    return (
      this.Kdh ||
        ((this.Kdh = !0),
        (this.$dh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.offset(),
        ))),
      this.$dh
    );
  }
  get RadiusIn() {
    return (
      this.mOh ||
        ((this.mOh = !0), (this.COh = this.FbDataInternal.radiusIn())),
      this.COh
    );
  }
  get RadiusOut() {
    return (
      this.gOh ||
        ((this.gOh = !0), (this.fOh = this.FbDataInternal.radiusOut())),
      this.fOh
    );
  }
  get RadiusOutOnStart() {
    return (
      this.pOh ||
        ((this.pOh = !0), (this.vOh = this.FbDataInternal.radiusOutOnStart())),
      this.vOh
    );
  }
  get MobileCorrect() {
    return (
      this.yOh ||
        ((this.yOh = !0), (this.SOh = this.FbDataInternal.mobileCorrect())),
      this.SOh
    );
  }
  get GamePadCorrect() {
    return (
      this.MOh ||
        ((this.MOh = !0), (this.EOh = this.FbDataInternal.gamePadCorrect())),
      this.EOh
    );
  }
}
exports.FbAimPart = FbAimPart;
//# sourceMappingURL=FbAimPart.js.map
