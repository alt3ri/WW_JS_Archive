"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbShowCenterText = void 0);
const FbTextStyle_1 = require("./FbTextStyle");
class FbShowCenterText {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.CCh = !1),
      (this.gCh = 0),
      (this.fCh = !1),
      (this.pCh = void 0),
      (this.vCh = !1),
      (this.yCh = void 0),
      (this.SCh = !1),
      (this.MCh = 0),
      (this.ECh = !1),
      (this.ICh = void 0),
      (this.TCh = !1),
      (this.bCh = void 0),
      (this.LCh = !1),
      (this.ACh = !1),
      (this.xCh = !1),
      (this.RCh = !1);
  }
  static Create(t) {
    if (t) return new FbShowCenterText(t);
  }
  get TextId() {
    return (
      this.CCh || ((this.CCh = !0), (this.gCh = this.FbDataInternal.textId())),
      this.gCh
    );
  }
  get TidCenterText() {
    return (
      this.fCh ||
        ((this.fCh = !0), (this.pCh = this.FbDataInternal.tidCenterText())),
      this.pCh
    );
  }
  get PlotLineKey() {
    return (
      this.vCh ||
        ((this.vCh = !0), (this.yCh = this.FbDataInternal.plotLineKey())),
      this.yCh
    );
  }
  get TotalTime() {
    return (
      this.SCh ||
        ((this.SCh = !0), (this.MCh = this.FbDataInternal.totalTime())),
      this.MCh
    );
  }
  get TextStyle() {
    return (
      this.ECh ||
        ((this.ECh = !0),
        (this.ICh = FbTextStyle_1.FbTextStyle.Create(
          this.FbDataInternal.textStyle(),
        ))),
      this.ICh
    );
  }
  get BgImageId() {
    return (
      this.TCh ||
        ((this.TCh = !0), (this.bCh = this.FbDataInternal.bgImageId())),
      this.bCh
    );
  }
  get IsMulLine() {
    return (
      this.LCh ||
        ((this.LCh = !0), (this.ACh = this.FbDataInternal.isMulLine())),
      this.ACh
    );
  }
  get IsManualNext() {
    return (
      this.xCh ||
        ((this.xCh = !0), (this.RCh = this.FbDataInternal.isManualNext())),
      this.RCh
    );
  }
}
exports.FbShowCenterText = FbShowCenterText;
//# sourceMappingURL=FbShowCenterText.js.map
