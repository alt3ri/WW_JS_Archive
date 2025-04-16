"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTransform = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbTransform {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.uch = !1),
      (this.dch = void 0),
      (this.Aph = !1),
      (this.xph = void 0),
      (this.Rph = !1),
      (this.wph = void 0),
      (this.ogh = !1),
      (this.ngh = !1);
  }
  static Create(t) {
    if (t) return new FbTransform(t);
  }
  get Pos() {
    return (
      this.uch ||
        ((this.uch = !0),
        (this.dch = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.pos(),
        ))),
      this.dch
    );
  }
  get Rot() {
    return (
      this.Aph ||
        ((this.Aph = !0),
        (this.xph = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.rot(),
        ))),
      this.xph
    );
  }
  get Scale() {
    return (
      this.Rph ||
        ((this.Rph = !0),
        (this.wph = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.scale(),
        ))),
      this.wph
    );
  }
  get _folded() {
    return (
      this.ogh || ((this.ogh = !0), (this.ngh = this.FbDataInternal.folded())),
      this.ngh
    );
  }
}
exports.FbTransform = FbTransform;
//# sourceMappingURL=FbTransform.js.map
