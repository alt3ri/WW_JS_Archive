"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFadeOutScreen = void 0);
const FbEaseData_1 = require("./FbEaseData");
class FbFadeOutScreen {
  constructor(e) {
    (this.FbDataInternal = e), (this.nCh = !1), (this.sCh = void 0);
  }
  static Create(e) {
    if (e) return new FbFadeOutScreen(e);
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
}
exports.FbFadeOutScreen = FbFadeOutScreen;
//# sourceMappingURL=FbFadeOutScreen.js.map
