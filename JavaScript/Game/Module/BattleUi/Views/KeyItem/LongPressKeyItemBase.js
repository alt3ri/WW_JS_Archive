"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongPressKeyItemBase = void 0);
const KeyItemBase_1 = require("./KeyItemBase");
class LongPressKeyItemBase extends KeyItemBase_1.KeyItemBase {
  constructor() {
    super(...arguments), (this.g_t = -0), (this.K1t = -0), (this.f_t = !1);
  }
  RefreshActionLongPress(s, t = 0) {
    this.ActionName !== s &&
      ((this.g_t = t), this.RefreshAction(s), this.p_t(0 < t), this.v_t(0));
  }
  ForceShowLongPress() {
    (this.g_t = 0), this.p_t(!0), this.v_t(100);
  }
  RefreshAxis(s) {
    this.AxisName !== s && ((this.g_t = 0), this.p_t(!1), super.RefreshAxis(s));
  }
  OnBeforeDestroy() {
    this.M_t();
  }
  OnInputAction(s, t) {
    this.IsEnable && 0 === t ? this.S_t() : this.M_t();
  }
  Tick(s) {
    this.f_t &&
      (!this.IsEnable ||
        ((this.K1t += s),
        this.v_t(this.K1t / this.g_t),
        this.K1t >= this.g_t)) &&
      this.M_t();
  }
  S_t() {
    (this.K1t = 0), this.v_t(0), (this.f_t = !0);
  }
  M_t() {
    (this.K1t = 0), this.v_t(0), (this.f_t = !1);
  }
  p_t(s) {
    this.GetLongPressItem()?.SetUIActive(s);
  }
  v_t(s) {
    this.GetLongPressTexture()?.SetFillAmount(s);
  }
}
exports.LongPressKeyItemBase = LongPressKeyItemBase;
//# sourceMappingURL=LongPressKeyItemBase.js.map
