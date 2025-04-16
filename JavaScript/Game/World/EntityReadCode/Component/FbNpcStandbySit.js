"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcStandbySit = void 0);
const FbMontageId_1 = require("../Action/FbMontageId");
class FbNpcStandbySit {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.mgh = !1),
      (this.Cgh = void 0),
      (this.j4h = !1),
      (this.H4h = void 0),
      (this.Qfh = !1),
      (this.Kfh = 0),
      (this.ISh = !1),
      (this.TSh = 0);
  }
  static Create(t) {
    if (t) return new FbNpcStandbySit(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Montage() {
    return (
      this.mgh || ((this.mgh = !0), (this.Cgh = this.FbDataInternal.montage())),
      this.Cgh
    );
  }
  get RegisteredMontageId() {
    return (
      this.j4h ||
        ((this.j4h = !0),
        (this.H4h = FbMontageId_1.FbMontageId.Create(
          this.FbDataInternal.registeredMontageId(),
        ))),
      this.H4h
    );
  }
  get FaceExpressionId() {
    return (
      this.Qfh ||
        ((this.Qfh = !0), (this.Kfh = this.FbDataInternal.faceExpressionId())),
      this.Kfh
    );
  }
  get PosEntityId() {
    return (
      this.ISh ||
        ((this.ISh = !0), (this.TSh = this.FbDataInternal.posEntityId())),
      this.TSh
    );
  }
}
exports.FbNpcStandbySit = FbNpcStandbySit;
//# sourceMappingURL=FbNpcStandbySit.js.map
