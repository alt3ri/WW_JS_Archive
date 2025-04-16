"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcSitDown = void 0);
const FbMontageId_1 = require("./FbMontageId");
class FbNpcSitDown {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Rfh = !1),
      (this.wfh = void 0),
      (this.ISh = !1),
      (this.TSh = 0),
      (this.I_h = !1),
      (this.y6o = 0);
  }
  static Create(t) {
    if (t) return new FbNpcSitDown(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MontageId() {
    return (
      this.Rfh ||
        ((this.Rfh = !0),
        (this.wfh = FbMontageId_1.FbMontageId.Create(
          this.FbDataInternal.montageId(),
        ))),
      this.wfh
    );
  }
  get PosEntityId() {
    return (
      this.ISh ||
        ((this.ISh = !0), (this.TSh = this.FbDataInternal.posEntityId())),
      this.TSh
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
}
exports.FbNpcSitDown = FbNpcSitDown;
//# sourceMappingURL=FbNpcSitDown.js.map
