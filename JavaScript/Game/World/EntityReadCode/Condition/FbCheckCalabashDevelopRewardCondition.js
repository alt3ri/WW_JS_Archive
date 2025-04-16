"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckCalabashDevelopRewardCondition = void 0);
class FbCheckCalabashDevelopRewardCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Xzh = !1),
      (this.Yzh = 0),
      (this.zzh = !1),
      (this.Jzh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckCalabashDevelopRewardCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MonsterId() {
    return (
      this.Xzh ||
        ((this.Xzh = !0), (this.Yzh = this.FbDataInternal.monsterId())),
      this.Yzh
    );
  }
  get Develop() {
    return (
      this.zzh || ((this.zzh = !0), (this.Jzh = this.FbDataInternal.develop())),
      this.Jzh
    );
  }
}
exports.FbCheckCalabashDevelopRewardCondition =
  FbCheckCalabashDevelopRewardCondition;
//# sourceMappingURL=FbCheckCalabashDevelopRewardCondition.js.map
