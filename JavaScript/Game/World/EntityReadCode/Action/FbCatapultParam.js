"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCatapultParam = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCatapultParam {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.pSh = !1),
      (this.vSh = void 0),
      (this.ySh = !1),
      (this.SSh = void 0),
      (this.MSh = !1),
      (this.ESh = 0),
      (this.Fph = !1),
      (this.Nph = 0),
      (this.gSh = !1),
      (this.fSh = void 0);
  }
  static Create(t) {
    if (t) return new FbCatapultParam(t);
  }
  get P1() {
    return (
      this.pSh ||
        ((this.pSh = !0),
        (this.vSh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.p1(),
        ))),
      this.vSh
    );
  }
  get P2() {
    return (
      this.ySh ||
        ((this.ySh = !0),
        (this.SSh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.p2(),
        ))),
      this.SSh
    );
  }
  get Gravity() {
    return (
      this.MSh || ((this.MSh = !0), (this.ESh = this.FbDataInternal.gravity())),
      this.ESh
    );
  }
  get Time() {
    return (
      this.Fph || ((this.Fph = !0), (this.Nph = this.FbDataInternal.time())),
      this.Nph
    );
  }
  get MotionCurve() {
    return (
      this.gSh ||
        ((this.gSh = !0), (this.fSh = this.FbDataInternal.motionCurve())),
      this.fSh
    );
  }
}
exports.FbCatapultParam = FbCatapultParam;
//# sourceMappingURL=FbCatapultParam.js.map
