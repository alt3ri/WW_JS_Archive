"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractNavigation = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  InputEnums_1 = require("../../../Input/InputEnums");
class InteractNavigation {
  constructor(t, s, h) {
    (this.F1i = 0),
      (this.V1i = 0),
      (this.H1i = 0),
      (t < (this.j1i = 0) || s < 0) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Interaction",
          9,
          "设置lookUp阈值和zoomThreshold阈值错误!",
          ["lookUpThreshold", t],
          ["zoomThreshold", s],
        ),
      (this.W1i = t),
      (this.K1i = s),
      (this.Q1i = h);
  }
  get Index() {
    return this.V1i;
  }
  set Index(t) {
    this.V1i = t;
  }
  get TotalNum() {
    return this.F1i;
  }
  UpdateValue(t, s, h = void 0) {
    var i,
      e = this.V1i;
    return (
      void 0 !== this.V1i
        ? t === InputEnums_1.EInputAxis.LookUp
          ? (this.H1i * s < 0 && (this.H1i = 0),
            (this.H1i += s),
            Math.abs(this.H1i) >= this.W1i &&
              ((i =
                (0 < s ? 1 : -1) * Math.floor(Math.abs(this.H1i / this.W1i))),
              (this.H1i -= this.W1i * i),
              (this.V1i += i)))
          : t === InputEnums_1.EInputAxis.Zoom &&
            (this.j1i * (i = -s) < 0 && (this.j1i = 0),
            (this.j1i += i),
            Math.abs(this.j1i) >= this.K1i) &&
            ((t = (0 < i ? 1 : -1) * Math.floor(Math.abs(this.j1i / this.K1i))),
            (this.j1i -= this.K1i * t),
            (this.V1i += t))
        : (this.V1i = 0),
      this.X1i(h),
      this.V1i !== e
    );
  }
  UpdateIndex(t) {
    var s = this.V1i;
    return this.X1i(t), this.V1i !== s;
  }
  X1i(t) {
    t && (this.F1i = t),
      this.F1i &&
        (this.V1i < 0 || this.V1i >= this.F1i) &&
        (this.Q1i
          ? ((this.V1i = this.V1i % this.F1i),
            this.V1i < 0 && (this.V1i = this.F1i + this.V1i))
          : (this.V1i = Math.max(0, Math.min(this.V1i, this.F1i - 1))));
  }
}
exports.InteractNavigation = InteractNavigation;
//# sourceMappingURL=InteractNavigation.js.map
