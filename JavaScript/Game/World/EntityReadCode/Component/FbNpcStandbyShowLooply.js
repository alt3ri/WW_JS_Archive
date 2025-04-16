"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcStandbyShowLooply = void 0);
const FbMontageId_1 = require("../Action/FbMontageId"),
  FbIgnoreEntityIdsCollision_1 = require("./FbIgnoreEntityIdsCollision");
class FbNpcStandbyShowLooply {
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
      (this.W4h = !1),
      (this.Q4h = void 0);
  }
  static Create(t) {
    if (t) return new FbNpcStandbyShowLooply(t);
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
  get IgnoreEntityCollision() {
    return (
      this.W4h ||
        ((this.W4h = !0),
        (this.Q4h =
          FbIgnoreEntityIdsCollision_1.FbIgnoreEntityIdsCollision.Create(
            this.FbDataInternal.ignoreEntityCollision(),
          ))),
      this.Q4h
    );
  }
}
exports.FbNpcStandbyShowLooply = FbNpcStandbyShowLooply;
//# sourceMappingURL=FbNpcStandbyShowLooply.js.map
