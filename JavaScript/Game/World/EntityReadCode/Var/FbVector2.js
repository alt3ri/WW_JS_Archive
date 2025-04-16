"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVector2 = void 0);
class FbVector2 {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Luh = !1),
      (this.Auh = 0),
      (this.xuh = !1),
      (this.Ruh = 0);
  }
  static Create(t) {
    if (t) return new FbVector2(t);
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
}
exports.FbVector2 = FbVector2;
//# sourceMappingURL=FbVector2.js.map
