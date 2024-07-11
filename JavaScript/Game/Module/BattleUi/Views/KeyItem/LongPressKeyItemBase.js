"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongPressKeyItemBase = void 0);
const KeyItemBase_1 = require("./KeyItemBase");
class LongPressKeyItemBase extends KeyItemBase_1.KeyItemBase {
  constructor() {
    super(...arguments), (this.xut = -0), (this.rut = -0), (this.wut = !1);
  }
  RefreshActionLongPress(s, t = 0) {
    this.ActionName !== s &&
      ((this.xut = t), this.RefreshAction(s), this.But(0 < t), this.but(0));
  }
  ForceShowLongPress() {
    (this.xut = 0), this.But(!0), this.but(100);
  }
  RefreshAxis(s) {
    this.AxisName !== s && ((this.xut = 0), this.But(!1), super.RefreshAxis(s));
  }
  OnBeforeDestroy() {
    this.qut();
  }
  OnInputAction(s, t) {
    this.IsEnable && 0 === t ? this.Gut() : this.qut();
  }
  Tick(s) {
    this.wut &&
      (!this.IsEnable ||
        ((this.rut += s),
        this.but(this.rut / this.xut),
        this.rut >= this.xut)) &&
      this.qut();
  }
  Gut() {
    (this.rut = 0), this.but(0), (this.wut = !0);
  }
  qut() {
    (this.rut = 0), this.but(0), (this.wut = !1);
  }
  But(s) {
    this.GetLongPressItem()?.SetUIActive(s);
  }
  but(s) {
    this.GetLongPressTexture()?.SetFillAmount(s);
  }
}
exports.LongPressKeyItemBase = LongPressKeyItemBase;
//# sourceMappingURL=LongPressKeyItemBase.js.map
