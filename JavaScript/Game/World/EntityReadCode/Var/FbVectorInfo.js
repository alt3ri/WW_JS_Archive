"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVectorInfo = void 0);
class FbVectorInfo {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Luh = !1),
      (this.Auh = 0),
      (this.xuh = !1),
      (this.Ruh = 0),
      (this.wuh = !1),
      (this.Puh = 0);
  }
  static Create(t) {
    if (t) return new FbVectorInfo(t);
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
}
exports.FbVectorInfo = FbVectorInfo;
//# sourceMappingURL=FbVectorInfo.js.map
