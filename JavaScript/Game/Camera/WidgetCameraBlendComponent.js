"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let h;
    const r = arguments.length;
    let n =
      r < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(t, e, i, s);
    else
      for (let o = t.length - 1; o >= 0; o--)
        (h = t[o]) && (n = (r < 3 ? h(n) : r > 3 ? h(e, i, n) : h(e, i)) || n);
    return r > 3 && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WidgetCameraBlendComponent = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
let WidgetCameraBlendComponent = class WidgetCameraBlendComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.bwr = -0),
      (this.qwr = -0),
      (this.Gwr = 0),
      (this.Nwr = -0),
      (this.Due = Vector_1.Vector.Create()),
      (this.xXo = void 0),
      (this.Owr = !1),
      (this.kwr = !1),
      (this.Fwr = void 0),
      (this.Vwr = void 0),
      (this.Hwr = !1),
      (this.jwr = !1),
      (this.ele = void 0);
  }
  get yxr() {
    return this.ele;
  }
  SetBlendParams(t, e, i, s, h, r, n, o, a, p, c) {
    (this.qwr = t),
      (this.bwr = t),
      (this.Gwr = e),
      (this.Nwr = i),
      (this.Owr = s),
      this.Owr &&
        ((this.Hwr = h),
        (t = this.yxr.CineCamera),
        this.Hwr
          ? (this.Vwr = t.SceneComponent.RelativeLocation)
          : (this.Vwr = t.K2_GetActorLocation()),
        r
          ? this.Due.FromUeVector(n)
          : this.Due.FromUeVector(this.Vwr.op_Addition(n)),
        (this.kwr = o),
        this.kwr) &&
        ((this.jwr = a),
        this.jwr
          ? (this.Fwr = t.SceneComponent.RelativeRotation)
          : (this.Fwr = t.K2_GetActorRotation()),
        (this.xXo = p ? c : c.op_Addition(this.Fwr)));
  }
  OnStart() {
    return (this.ele = this.Entity.GetComponent(12)), this.ele.Valid;
  }
  OnEnd() {
    return !(this.ele = void 0);
  }
  OnTick(t) {
    (t = this.bwr - t), (this.bwr = Math.max(t, 0)), (t = this.Wwr());
    this.Kwr(t), this.T_e(t);
  }
  Kwr(t) {
    let e, i;
    this.Owr &&
      ((t = UE.KismetMathLibrary.VLerp(this.Vwr, this.Due.ToUeVector(), t)),
      (e = this.yxr.CineCamera),
      this.Hwr
        ? ((i = new UE.HitResult()),
          (i = (0, puerts_1.$ref)(i)),
          e.K2_SetActorRelativeLocation(t, !1, i, !1),
          Vector_1.Vector.Create(e.SceneComponent.RelativeLocation).Equals(
            this.Due,
            0.1,
          ) && (this.Owr = !1))
        : ((i = new UE.HitResult()),
          (i = (0, puerts_1.$ref)(i)),
          e.K2_SetActorRelativeLocation(t, !1, i, !1),
          Vector_1.Vector.Create(e.K2_GetActorLocation()).Equals(
            this.Due,
            0.1,
          ) && (this.Owr = !1)));
  }
  T_e(t) {
    let e, i;
    this.kwr &&
      ((t = UE.KismetMathLibrary.RLerp(this.Fwr, this.xXo, t, !0)),
      (e = this.yxr.CineCamera),
      this.jwr
        ? ((i = new UE.HitResult()),
          (i = (0, puerts_1.$ref)(i)),
          e.K2_SetActorRelativeRotation(t, !1, i, !1),
          UE.KismetMathLibrary.EqualEqual_RotatorRotator(
            e.SceneComponent.RelativeRotation,
            this.xXo,
            0.1,
          ) && (this.Owr = !1))
        : ((i = new UE.HitResult()),
          (i = (0, puerts_1.$ref)(i)),
          e.K2_SetActorRelativeRotation(t, !1, i, !1),
          UE.KismetMathLibrary.EqualEqual_RotatorRotator(
            e.K2_GetActorRotation(),
            this.xXo,
            0.1,
          ) && (this.Owr = !1)));
  }
  Wwr() {
    const t = MathUtils_1.MathUtils.SafeDivide(this.qwr - this.bwr, this.qwr);
    let e = 0;
    switch (this.Gwr) {
      case 1:
        e = UE.KismetMathLibrary.FInterpEaseInOut(0, 1, t, 3);
        break;
      case 2:
      case 4:
      case 3:
        e = UE.KismetMathLibrary.Ease(0, 1, t, this.Nwr);
        break;
      case 0:
        e = MathUtils_1.MathUtils.Lerp(0, 1, t);
    }
    return e;
  }
};
(WidgetCameraBlendComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(11)],
  WidgetCameraBlendComponent,
)),
  (exports.WidgetCameraBlendComponent = WidgetCameraBlendComponent);
// # sourceMappingURL=WidgetCameraBlendComponent.js.map
