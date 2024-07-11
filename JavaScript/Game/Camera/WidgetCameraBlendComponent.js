"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var h,
      r = arguments.length,
      n =
        r < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, s);
    else
      for (var o = t.length - 1; 0 <= o; o--)
        (h = t[o]) && (n = (r < 3 ? h(n) : 3 < r ? h(e, i, n) : h(e, i)) || n);
    return 3 < r && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WidgetCameraBlendComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
let WidgetCameraBlendComponent = class WidgetCameraBlendComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.uwr = -0),
      (this.cwr = -0),
      (this.mwr = 0),
      (this.dwr = -0),
      (this.Due = Vector_1.Vector.Create()),
      (this.U$o = void 0),
      (this.Cwr = !1),
      (this.gwr = !1),
      (this.fwr = void 0),
      (this.pwr = void 0),
      (this.vwr = !1),
      (this.Mwr = !1),
      (this.ele = void 0);
  }
  get ZPr() {
    return this.ele;
  }
  SetBlendParams(t, e, i, s, h, r, n, o, a, p, c) {
    (this.cwr = t),
      (this.uwr = t),
      (this.mwr = e),
      (this.dwr = i),
      (this.Cwr = s),
      this.Cwr &&
        ((this.vwr = h),
        (t = this.ZPr.CineCamera),
        this.vwr
          ? (this.pwr = t.SceneComponent.RelativeLocation)
          : (this.pwr = t.K2_GetActorLocation()),
        r
          ? this.Due.FromUeVector(n)
          : this.Due.FromUeVector(this.pwr.op_Addition(n)),
        (this.gwr = o),
        this.gwr) &&
        ((this.Mwr = a),
        this.Mwr
          ? (this.fwr = t.SceneComponent.RelativeRotation)
          : (this.fwr = t.K2_GetActorRotation()),
        (this.U$o = p ? c : c.op_Addition(this.fwr)));
  }
  OnStart() {
    return (this.ele = this.Entity.GetComponent(12)), this.ele.Valid;
  }
  OnEnd() {
    return !(this.ele = void 0);
  }
  OnTick(t) {
    (t = this.uwr - t), (this.uwr = Math.max(t, 0)), (t = this.Ewr());
    this.Swr(t), this.T_e(t);
  }
  Swr(t) {
    var e, i;
    this.Cwr &&
      ((t = UE.KismetMathLibrary.VLerp(this.pwr, this.Due.ToUeVector(), t)),
      (e = this.ZPr.CineCamera),
      this.vwr
        ? ((i = new UE.HitResult()),
          (i = (0, puerts_1.$ref)(i)),
          e.K2_SetActorRelativeLocation(t, !1, i, !1),
          Vector_1.Vector.Create(e.SceneComponent.RelativeLocation).Equals(
            this.Due,
            0.1,
          ) && (this.Cwr = !1))
        : ((i = new UE.HitResult()),
          (i = (0, puerts_1.$ref)(i)),
          e.K2_SetActorRelativeLocation(t, !1, i, !1),
          Vector_1.Vector.Create(e.K2_GetActorLocation()).Equals(
            this.Due,
            0.1,
          ) && (this.Cwr = !1)));
  }
  T_e(t) {
    var e, i;
    this.gwr &&
      ((t = UE.KismetMathLibrary.RLerp(this.fwr, this.U$o, t, !0)),
      (e = this.ZPr.CineCamera),
      this.Mwr
        ? ((i = new UE.HitResult()),
          (i = (0, puerts_1.$ref)(i)),
          e.K2_SetActorRelativeRotation(t, !1, i, !1),
          UE.KismetMathLibrary.EqualEqual_RotatorRotator(
            e.SceneComponent.RelativeRotation,
            this.U$o,
            0.1,
          ) && (this.Cwr = !1))
        : ((i = new UE.HitResult()),
          (i = (0, puerts_1.$ref)(i)),
          e.K2_SetActorRelativeRotation(t, !1, i, !1),
          UE.KismetMathLibrary.EqualEqual_RotatorRotator(
            e.K2_GetActorRotation(),
            this.U$o,
            0.1,
          ) && (this.Cwr = !1)));
  }
  Ewr() {
    var t = MathUtils_1.MathUtils.SafeDivide(this.cwr - this.uwr, this.cwr);
    let e = 0;
    switch (this.mwr) {
      case 1:
        e = UE.KismetMathLibrary.FInterpEaseInOut(0, 1, t, 3);
        break;
      case 2:
      case 4:
      case 3:
        e = UE.KismetMathLibrary.Ease(0, 1, t, this.dwr);
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
//# sourceMappingURL=WidgetCameraBlendComponent.js.map
