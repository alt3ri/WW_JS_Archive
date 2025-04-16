"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetPlotMode = void 0);
const FbFadeInScreen_1 = require("./FbFadeInScreen");
class FbSetPlotMode {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Lmh = !1),
      (this.NMr = void 0),
      (this.Omh = !1),
      (this.Fmh = !1),
      (this.Nmh = !1),
      (this.Vmh = !1),
      (this.jmh = !1),
      (this.Hmh = !1),
      (this.Wmh = !1),
      (this.Qmh = !1),
      (this.Kmh = !1),
      (this.$mh = !1),
      (this.Xmh = !1),
      (this.Ymh = !1),
      (this.zmh = !1),
      (this.Jmh = !1),
      (this.Zmh = !1),
      (this.eCh = void 0),
      (this.tCh = !1),
      (this.iCh = !1);
  }
  static Create(t) {
    if (t) return new FbSetPlotMode(t);
  }
  get Mode() {
    return (
      this.Lmh || ((this.Lmh = !0), (this.NMr = this.FbDataInternal.mode())),
      this.NMr
    );
  }
  get IsSwitchMainRole() {
    return (
      this.Omh ||
        ((this.Omh = !0), (this.Fmh = this.FbDataInternal.isSwitchMainRole())),
      this.Fmh
    );
  }
  get UseFlowCamera() {
    return (
      this.Nmh ||
        ((this.Nmh = !0), (this.Vmh = this.FbDataInternal.useFlowCamera())),
      this.Vmh
    );
  }
  get Interruptible() {
    return (
      this.jmh ||
        ((this.jmh = !0), (this.Hmh = this.FbDataInternal.interruptible())),
      this.Hmh
    );
  }
  get NoSkip() {
    return (
      this.Wmh || ((this.Wmh = !0), (this.Qmh = this.FbDataInternal.noSkip())),
      this.Qmh
    );
  }
  get DisableAutoFadeOut() {
    return (
      this.Kmh ||
        ((this.Kmh = !0),
        (this.$mh = this.FbDataInternal.disableAutoFadeOut())),
      this.$mh
    );
  }
  get WaitForPlayerMotionEnd() {
    return (
      this.Xmh ||
        ((this.Xmh = !0),
        (this.Ymh = this.FbDataInternal.waitForPlayerMotionEnd())),
      this.Ymh
    );
  }
  get NoUiEnterAnimation() {
    return (
      this.zmh ||
        ((this.zmh = !0),
        (this.Jmh = this.FbDataInternal.noUiEnterAnimation())),
      this.Jmh
    );
  }
  get FastFadeIn() {
    return (
      this.Zmh ||
        ((this.Zmh = !0),
        (this.eCh = FbFadeInScreen_1.FbFadeInScreen.Create(
          this.FbDataInternal.fastFadeIn(),
        ))),
      this.eCh
    );
  }
  get KeepMainRolePose() {
    return (
      this.tCh ||
        ((this.tCh = !0), (this.iCh = this.FbDataInternal.keepMainRolePose())),
      this.iCh
    );
  }
}
exports.FbSetPlotMode = FbSetPlotMode;
//# sourceMappingURL=FbSetPlotMode.js.map
