"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFadeInScreen = void 0);
const FbEaseData_1 = require("./FbEaseData");
class FbFadeInScreen {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.rCh = !1),
      (this.oCh = void 0),
      (this.nCh = !1),
      (this.sCh = void 0),
      (this.aCh = !1),
      (this.hCh = void 0),
      (this.lCh = !1),
      (this._Ch = !1);
  }
  static Create(t) {
    if (t) return new FbFadeInScreen(t);
  }
  get TypeOverride() {
    return (
      this.rCh ||
        ((this.rCh = !0), (this.oCh = this.FbDataInternal.typeOverride())),
      this.oCh
    );
  }
  get Ease() {
    return (
      this.nCh ||
        ((this.nCh = !0),
        (this.sCh = FbEaseData_1.FbEaseData.Create(
          this.FbDataInternal.ease(),
        ))),
      this.sCh
    );
  }
  get ScreenType() {
    return (
      this.aCh ||
        ((this.aCh = !0), (this.hCh = this.FbDataInternal.screenType())),
      this.hCh
    );
  }
  get KeepFadeAfterTreeEnd() {
    return (
      this.lCh ||
        ((this.lCh = !0),
        (this._Ch = this.FbDataInternal.keepFadeAfterTreeEnd())),
      this._Ch
    );
  }
}
exports.FbFadeInScreen = FbFadeInScreen;
//# sourceMappingURL=FbFadeInScreen.js.map
