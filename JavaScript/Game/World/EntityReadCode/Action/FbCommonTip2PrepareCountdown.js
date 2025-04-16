"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCommonTip2PrepareCountdown = void 0);
class FbCommonTip2PrepareCountdown {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.yyh = !1),
      (this.Syh = 0),
      (this.Myh = !1),
      (this.Eyh = void 0),
      (this.Iyh = !1),
      (this.Tyh = !1);
  }
  static Create(t) {
    if (t) return new FbCommonTip2PrepareCountdown(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CountDownNum() {
    return (
      this.yyh ||
        ((this.yyh = !0), (this.Syh = this.FbDataInternal.countDownNum())),
      this.Syh
    );
  }
  get TidCountDownTxt() {
    return (
      this.Myh ||
        ((this.Myh = !0), (this.Eyh = this.FbDataInternal.tidCountDownTxt())),
      this.Eyh
    );
  }
  get IsBlockPlayer() {
    return (
      this.Iyh ||
        ((this.Iyh = !0), (this.Tyh = this.FbDataInternal.isBlockPlayer())),
      this.Tyh
    );
  }
}
exports.FbCommonTip2PrepareCountdown = FbCommonTip2PrepareCountdown;
//# sourceMappingURL=FbCommonTip2PrepareCountdown.js.map
