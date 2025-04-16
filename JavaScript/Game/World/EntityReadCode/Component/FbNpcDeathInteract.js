"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcDeathInteract = void 0);
const FbMontageId_1 = require("../Action/FbMontageId");
class FbNpcDeathInteract {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.mgh = !1),
      (this.Cgh = void 0),
      (this.L6h = !1),
      (this.A6h = void 0);
  }
  static Create(t) {
    if (t) return new FbNpcDeathInteract(t);
  }
  get Montage() {
    return (
      this.mgh ||
        ((this.mgh = !0),
        (this.Cgh = FbMontageId_1.FbMontageId.Create(
          this.FbDataInternal.montage(),
        ))),
      this.Cgh
    );
  }
  get MaterialDa() {
    return (
      this.L6h ||
        ((this.L6h = !0), (this.A6h = this.FbDataInternal.materialDa())),
      this.A6h
    );
  }
}
exports.FbNpcDeathInteract = FbNpcDeathInteract;
//# sourceMappingURL=FbNpcDeathInteract.js.map
