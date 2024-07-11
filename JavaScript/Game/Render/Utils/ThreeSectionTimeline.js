"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ThreeSectionTimeline = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  RenderModuleController_1 = require("../Manager/RenderModuleController");
class ThreeSectionTimeline {
  constructor() {
    (this.il = -0),
      (this.kC = -0),
      (this.wXt = -0),
      (this.r_r = !1),
      (this.n_r = !1),
      (this.s_r = -0),
      (this.a_r = !1),
      (this.h_r = -0),
      (this.l_r = !1),
      (this.__r = !0),
      (this.blr = !1),
      (this.u_r = void 0),
      (this.c_r = -0);
  }
  Setup(t, i, s, h = !0, e = !1) {
    (this.il = t),
      (this.kC = i),
      (this.wXt = s),
      (this.s_r = t + i + s),
      (this.a_r = h),
      (this.h_r = 0),
      (this.l_r = !1),
      (this.__r = !1),
      (this.blr = e),
      (this.u_r = 0),
      (this.c_r = 0);
    MathUtils_1.MathUtils.IsNearlyEqual(i, 0, 0.001)
      ? (this.r_r = !0)
      : (this.r_r = !1),
      MathUtils_1.MathUtils.IsNearlyEqual(s, 0, 0.001)
        ? (this.n_r = !0)
        : (this.n_r = !1);
  }
  Update(t) {
    this.__r ||
      ((t = this.m_r(t)),
      (this.h_r += t),
      this.l_r
        ? this.h_r >= this.s_r && (this.__r = !0)
        : this.h_r >= this.il + this.kC &&
          (this.a_r
            ? this.r_r
              ? (this.h_r = this.il)
              : ((t = this.h_r - this.il),
                (this.h_r = this.il + (t - Math.floor(t / this.kC) * this.kC)))
            : ((this.l_r = !0),
              (this.n_r || this.h_r >= this.s_r) && (this.__r = !0))),
      this.d_r());
  }
  TriggerEnd() {
    (this.l_r = !0),
      (this.h_r = this.il + this.kC),
      this.n_r && (this.__r = !0),
      this.d_r();
  }
  SetLoop(t) {
    this.a_r = t;
  }
  GetCurrState() {
    return this.u_r;
  }
  IsDead() {
    return this.__r;
  }
  GetCurrFactor() {
    return this.c_r;
  }
  GetFloatFromGroup(t) {
    switch (this.u_r) {
      case 0:
        return UE.KuroCurveLibrary.GetValue_Float(
          t.Start,
          this.GetCurrFactor(),
        );
      case 1:
        return UE.KuroCurveLibrary.GetValue_Float(t.Loop, this.GetCurrFactor());
      default:
        return UE.KuroCurveLibrary.GetValue_Float(t.End, this.GetCurrFactor());
    }
  }
  GetColorFromGroup(t) {
    switch (this.u_r) {
      case 0:
        return UE.KuroCurveLibrary.GetValue_LinearColor(
          t.Start,
          this.GetCurrFactor(),
        );
      case 1:
        return UE.KuroCurveLibrary.GetValue_LinearColor(
          t.Loop,
          this.GetCurrFactor(),
        );
      default:
        return UE.KuroCurveLibrary.GetValue_LinearColor(
          t.End,
          this.GetCurrFactor(),
        );
    }
  }
  m_r(t) {
    if (
      !this.blr &&
      RenderModuleController_1.RenderModuleController.IsGamePaused
    )
      return 0;
    if (this.blr) {
      var i =
        RenderModuleController_1.RenderModuleController.GlobalTimeDilation;
      if (!MathUtils_1.MathUtils.IsNearlyEqual(i, 1)) return t * (1 / i);
    }
    return t;
  }
  d_r() {
    this.__r
      ? ((this.u_r = 3), (this.c_r = 1))
      : this.l_r
        ? ((this.u_r = 2),
          (this.c_r = (this.h_r - this.il - this.kC) / this.wXt))
        : this.h_r < this.il
          ? ((this.u_r = 0), (this.c_r = this.h_r / this.il))
          : ((this.u_r = 1),
            this.r_r && (this.c_r = 1),
            (this.c_r = (this.h_r - this.il) / this.kC));
  }
}
exports.ThreeSectionTimeline = ThreeSectionTimeline;
//# sourceMappingURL=ThreeSectionTimeline.js.map
