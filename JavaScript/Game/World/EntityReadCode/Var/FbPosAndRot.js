"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPosAndRot = void 0);
class FbPosAndRot {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Luh = !1),
      (this.Auh = 0),
      (this.xuh = !1),
      (this.Ruh = 0),
      (this.wuh = !1),
      (this.Puh = 0),
      (this.Uuh = !1),
      (this.Duh = 0),
      (this.L7_ = !1),
      (this.w7_ = 0),
      (this.R7_ = !1),
      (this.A7_ = 0);
  }
  static Create(t) {
    if (t) return new FbPosAndRot(t);
  }
  get X() {
    return (
      this.Luh || ((this.Luh = !0), (this.Auh = this.FbDataInternal.x())),
      this.Auh
    );
  }
  get Y() {
    return (
      this.xuh || ((this.xuh = !0), (this.Ruh = this.FbDataInternal.y())),
      this.Ruh
    );
  }
  get Z() {
    return (
      this.wuh || ((this.wuh = !0), (this.Puh = this.FbDataInternal.z())),
      this.Puh
    );
  }
  get A() {
    return (
      this.Uuh || ((this.Uuh = !0), (this.Duh = this.FbDataInternal.a())),
      this.Duh
    );
  }
  get Roll() {
    return (
      this.L7_ || ((this.L7_ = !0), (this.w7_ = this.FbDataInternal.roll())),
      this.w7_
    );
  }
  get Pitch() {
    return (
      this.R7_ || ((this.R7_ = !0), (this.A7_ = this.FbDataInternal.pitch())),
      this.A7_
    );
  }
}
exports.FbPosAndRot = FbPosAndRot;
//# sourceMappingURL=FbPosAndRot.js.map
