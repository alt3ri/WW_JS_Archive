"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, s, e) {
    var h,
      o = arguments.length,
      r =
        o < 3
          ? i
          : null === e
            ? (e = Object.getOwnPropertyDescriptor(i, s))
            : e;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, i, s, e);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (h = t[a]) && (r = (o < 3 ? h(r) : 3 < o ? h(i, s, r) : h(i, s)) || r);
    return 3 < o && r && Object.defineProperty(i, s, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FreeCameraLogicComponent = void 0);
const Info_1 = require("../../Core/Common/Info"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  CurveUtils_1 = require("../../Core/Utils/Curve/CurveUtils"),
  DataTableUtil_1 = require("../../Core/Utils/DataTableUtil"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils");
let FreeCameraLogicComponent = class FreeCameraLogicComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ZPr = void 0),
      (this.qne = Vector_1.Vector.Create()),
      (this.jCn = Rotator_1.Rotator.Create()),
      (this.Co1 = 0),
      (this.n7i = 0),
      (this.cwr = 0),
      (this.kt1 = 0),
      (this.Ot1 = void 0),
      (this.qt1 = void 0),
      (this.ZHa = Rotator_1.Rotator.Create()),
      (this.gS1 = Rotator_1.Rotator.Create()),
      (this.CS1 = Rotator_1.Rotator.Create()),
      (this.Gt1 = !1),
      (this.Ft1 = 0),
      (this.Nt1 = 0),
      (this.E_e = 0),
      (this.Usr = Vector_1.Vector.Create()),
      (this.Vt1 = Vector_1.Vector.Create()),
      (this.Kxr = Vector_1.Vector.Create()),
      (this.LYe = Vector_1.Vector.Create()),
      (this.cz = Vector_1.Vector.Create()),
      (this.e7o = Quat_1.Quat.Create());
  }
  get Ic() {
    return this.ZPr?.CameraActor;
  }
  OnInit() {
    return (this.ZPr = this.Entity.GetComponent(282)), !0;
  }
  InitConfig(t) {
    var i = Info_1.Info.IsMobileInputModel();
    let s = void 0;
    for (const h of t) {
      var e = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
        24,
        h.toString(),
      );
      e && ((!i && e.PC生效) || (i && e.手机生效)) && (s = e);
    }
    s &&
      (this.qne.FromUeVector(s.初始位置),
      this.jCn.FromUeRotator(s.初始旋转),
      (this.Co1 = s.初始FOV),
      this.ResetToInit());
  }
  ResetToInit(t = 0, i, s) {
    this.ApplyCameraBlend(this.qne, this.jCn, 0, t, i, this.Co1, s);
  }
  ApplyCameraBlend(i, s, e, h, o, r = -1, a) {
    1 === this.n7i && this.jt1();
    var n = this.Ic,
      _ = n?.CameraComponent;
    if (n?.IsValid() && _?.IsValid()) {
      this.ZHa.Quaternion(this.e7o),
        this.e7o.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.LYe),
        this.LYe.Multiply(-e, this.cz),
        i.Addition(this.cz, this.Vt1);
      let t = s;
      void 0 === t && (t = this.jCn);
      n = 0 < r ? r : this.Co1;
      this.CS1.DeepCopy(t),
        0 === h
          ? (this.Kxr.DeepCopy(this.Vt1),
            this.ZHa.DeepCopy(t),
            0 < n && (_.FieldOfView = n),
            a?.())
          : ((this.cwr = h),
            (this.kt1 = 0),
            (this.Ot1 = o || CurveUtils_1.CurveUtils.CreateCurve(0)),
            (this.Ft1 = _.FieldOfView),
            0 < n && ((this.Nt1 = n), (this.Gt1 = !0)),
            (this.qt1 = a),
            this.Usr.DeepCopy(this.Kxr),
            this.gS1.DeepCopy(this.ZHa),
            (this.n7i = 1));
    } else a?.();
  }
  jt1() {
    (this.Nt1 = -1),
      (this.Gt1 = !1),
      (this.cwr = 0),
      (this.kt1 = 0),
      (this.Ot1 = void 0),
      (this.n7i = 0),
      this.qt1?.(),
      (this.qt1 = void 0);
  }
  OnAfterTick(t) {
    var i = this.Ic,
      s = i?.CameraComponent;
    i?.IsValid() &&
      s?.IsValid() &&
      (this.Gt1 && (s.FieldOfView = this.E_e),
      (i = t * MathUtils_1.MathUtils.MillisecondToSecond),
      this.Ht1(i),
      this.Ic?.D_K2_SetActorLocationAndRotation(
        this.Kxr.ToUeVector(!0),
        this.ZHa.ToUeRotator(),
        !1,
        void 0,
        !0,
      ));
  }
  Ht1(t) {
    0 !== this.n7i &&
      (this.kt1 >= this.cwr
        ? this.jt1()
        : ((this.kt1 += t),
          (t = this.Ot1.GetCurrentValue(this.kt1 / this.cwr)),
          Vector_1.Vector.Lerp(this.Usr, this.Vt1, t, this.Kxr),
          Rotator_1.Rotator.Lerp(this.gS1, this.CS1, t, this.ZHa),
          this.Gt1 &&
            (this.E_e = MathUtils_1.MathUtils.Lerp(this.Ft1, this.Nt1, t))));
  }
};
(FreeCameraLogicComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(283)],
  FreeCameraLogicComponent,
)),
  (exports.FreeCameraLogicComponent = FreeCameraLogicComponent);
//# sourceMappingURL=FreeCameraLogicComponent.js.map
