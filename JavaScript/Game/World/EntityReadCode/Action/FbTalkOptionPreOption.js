"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTalkOptionPreOption = void 0);
class FbTalkOptionPreOption {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.$gh = !1),
      (this.Xgh = void 0);
  }
  static Create(t) {
    if (t) return new FbTalkOptionPreOption(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PreOptions() {
    if (!this.$gh) {
      (this.$gh = !0), (this.Xgh = new Array());
      var i = this.FbDataInternal.preOptionsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.Xgh.push(this.FbDataInternal.preOptions(t));
    }
    return this.Xgh;
  }
}
exports.FbTalkOptionPreOption = FbTalkOptionPreOption;
//# sourceMappingURL=FbTalkOptionPreOption.js.map
