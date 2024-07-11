"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractNavigation = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  InputEnums_1 = require("../../../Input/InputEnums");
class InteractNavigation {
  constructor(t, s, h) {
    (this.F_i = 0),
      (this.V_i = 0),
      (this.H_i = 0),
      (t < (this.j_i = 0) || s < 0) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Interaction",
          9,
          "设置lookUp阈值和zoomThreshold阈值错误!",
          ["lookUpThreshold", t],
          ["zoomThreshold", s],
        ),
      (this.W_i = t),
      (this.K_i = s),
      (this.Q_i = h);
  }
  get Index() {
    return this.V_i;
  }
  set Index(t) {
    this.V_i = t;
  }
  get TotalNum() {
    return this.F_i;
  }
  UpdateValue(t, s, h = void 0) {
    var i,
      e = this.V_i;
    return (
      void 0 !== this.V_i
        ? t === InputEnums_1.EInputAxis.LookUp
          ? (this.H_i * s < 0 && (this.H_i = 0),
            (this.H_i += s),
            Math.abs(this.H_i) >= this.W_i &&
              ((i =
                (0 < s ? 1 : -1) * Math.floor(Math.abs(this.H_i / this.W_i))),
              (this.H_i -= this.W_i * i),
              (this.V_i += i)))
          : t === InputEnums_1.EInputAxis.Zoom &&
            (this.j_i * (i = -s) < 0 && (this.j_i = 0),
            (this.j_i += i),
            Math.abs(this.j_i) >= this.K_i) &&
            ((t = (0 < i ? 1 : -1) * Math.floor(Math.abs(this.j_i / this.K_i))),
            (this.j_i -= this.K_i * t),
            (this.V_i += t))
        : (this.V_i = 0),
      this.X_i(h),
      this.V_i !== e
    );
  }
  UpdateIndex(t) {
    var s = this.V_i;
    return this.X_i(t), this.V_i !== s;
  }
  X_i(t) {
    t && (this.F_i = t),
      this.F_i &&
        (this.V_i < 0 || this.V_i >= this.F_i) &&
        (this.Q_i
          ? ((this.V_i = this.V_i % this.F_i),
            this.V_i < 0 && (this.V_i = this.F_i + this.V_i))
          : (this.V_i = Math.max(0, Math.min(this.V_i, this.F_i - 1))));
  }
}
exports.InteractNavigation = InteractNavigation;
//# sourceMappingURL=InteractNavigation.js.map
