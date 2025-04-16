"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFailurePoseInteract = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbFailurePoseInteract {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Aph = !1),
      (this.xph = void 0);
  }
  static Create(t) {
    if (t) return new FbFailurePoseInteract(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
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
}
exports.FbFailurePoseInteract = FbFailurePoseInteract;
//# sourceMappingURL=FbFailurePoseInteract.js.map
