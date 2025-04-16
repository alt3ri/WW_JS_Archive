"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFightInteractComponent = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbFightInteractComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Cjh = !1),
      (this._an = 0),
      (this.gjh = !1),
      (this.fjh = void 0);
  }
  static Create(t) {
    if (t) return new FbFightInteractComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get LockRange() {
    return (
      this.Cjh ||
        ((this.Cjh = !0), (this._an = this.FbDataInternal.lockRange())),
      this._an
    );
  }
  get LockOffset() {
    return (
      this.gjh ||
        ((this.gjh = !0),
        (this.fjh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.lockOffset(),
        ))),
      this.fjh
    );
  }
}
exports.FbFightInteractComponent = FbFightInteractComponent;
//# sourceMappingURL=FbFightInteractComponent.js.map
