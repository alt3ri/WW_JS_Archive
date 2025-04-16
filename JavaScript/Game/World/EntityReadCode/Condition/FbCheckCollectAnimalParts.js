"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckCollectAnimalParts = void 0);
class FbCheckCollectAnimalParts {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.XJh = !1),
      (this.YJh = 0),
      (this.wJh = !1),
      (this.PJh = void 0),
      (this.zJh = !1),
      (this.JJh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckCollectAnimalParts(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TargetAnimal() {
    return (
      this.XJh ||
        ((this.XJh = !0), (this.YJh = this.FbDataInternal.targetAnimal())),
      this.YJh
    );
  }
  get CheckType() {
    return (
      this.wJh ||
        ((this.wJh = !0), (this.PJh = this.FbDataInternal.checkType())),
      this.PJh
    );
  }
  get Slots() {
    if (!this.zJh) {
      (this.zJh = !0), (this.JJh = new Array());
      var s = this.FbDataInternal.slotsLength();
      if (s)
        for (let t = 0; t < s; ++t) this.JJh.push(this.FbDataInternal.slots(t));
    }
    return this.JJh;
  }
}
exports.FbCheckCollectAnimalParts = FbCheckCollectAnimalParts;
//# sourceMappingURL=FbCheckCollectAnimalParts.js.map
