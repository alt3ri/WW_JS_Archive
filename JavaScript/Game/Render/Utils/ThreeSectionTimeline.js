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
      (this.wQt = -0),
      (this.a1r = !1),
      (this.h1r = !1),
      (this.l1r = -0),
      (this._1r = !1),
      (this.u1r = -0),
      (this.c1r = !1),
      (this.m1r = !0),
      (this.Nhr = !1),
      (this.d1r = void 0),
      (this.C1r = -0);
  }
  Setup(t, i, s, h = !0, e = !1) {
    (this.il = t),
      (this.kC = i),
      (this.wQt = s),
      (this.l1r = t + i + s),
      (this._1r = h),
      (this.u1r = 0),
      (this.c1r = !1),
      (this.m1r = !1),
      (this.Nhr = e),
      (this.d1r = 0),
      (this.C1r = 0);
    MathUtils_1.MathUtils.IsNearlyEqual(i, 0, 0.001)
      ? (this.a1r = !0)
      : (this.a1r = !1),
      MathUtils_1.MathUtils.IsNearlyEqual(s, 0, 0.001)
        ? (this.h1r = !0)
        : (this.h1r = !1);
  }
  Update(t) {
    this.m1r ||
      ((t = this.g1r(t)),
      (this.u1r += t),
      this.c1r
        ? this.u1r >= this.l1r && (this.m1r = !0)
        : this.u1r >= this.il + this.kC &&
          (this._1r
            ? this.a1r
              ? (this.u1r = this.il)
              : ((t = this.u1r - this.il),
                (this.u1r = this.il + (t - Math.floor(t / this.kC) * this.kC)))
            : ((this.c1r = !0),
              (this.h1r || this.u1r >= this.l1r) && (this.m1r = !0))),
      this.f1r());
  }
  TriggerEnd() {
    (this.c1r = !0),
      (this.u1r = this.il + this.kC),
      this.h1r && (this.m1r = !0),
      this.f1r();
  }
  SetLoop(t) {
    this._1r = t;
  }
  GetCurrState() {
    return this.d1r;
  }
  IsDead() {
    return this.m1r;
  }
  GetCurrFactor() {
    return this.C1r;
  }
  GetFloatFromGroup(t) {
    switch (this.d1r) {
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
    switch (this.d1r) {
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
  g1r(t) {
    if (
      !this.Nhr &&
      RenderModuleController_1.RenderModuleController.IsGamePaused
    )
      return 0;
    if (this.Nhr) {
      var i =
        RenderModuleController_1.RenderModuleController.GlobalTimeDilation;
      if (!MathUtils_1.MathUtils.IsNearlyEqual(i, 1)) return t * (1 / i);
    }
    return t;
  }
  f1r() {
    this.m1r
      ? ((this.d1r = 3), (this.C1r = 1))
      : this.c1r
        ? ((this.d1r = 2),
          (this.C1r = (this.u1r - this.il - this.kC) / this.wQt))
        : this.u1r < this.il
          ? ((this.d1r = 0), (this.C1r = this.u1r / this.il))
          : ((this.d1r = 1),
            this.a1r && (this.C1r = 1),
            (this.C1r = (this.u1r - this.il) / this.kC));
  }
}
exports.ThreeSectionTimeline = ThreeSectionTimeline;
//# sourceMappingURL=ThreeSectionTimeline.js.map
