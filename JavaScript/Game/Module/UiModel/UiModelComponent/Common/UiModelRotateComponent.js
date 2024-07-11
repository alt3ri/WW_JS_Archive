"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    var s,
      n = arguments.length,
      h =
        n < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, o))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, o, i);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (s = t[r]) && (h = (n < 3 ? s(h) : 3 < n ? s(e, o, h) : s(e, o)) || h);
    return 3 < n && h && Object.defineProperty(e, o, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelRotateComponent = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelRotateComponent = class UiModelRotateComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.nXt = void 0),
      (this.ABr = 0),
      (this.Rxe = !1),
      (this.hwe = void 0),
      (this.UBr = void 0),
      (this.PBr = !1);
  }
  OnInit() {
    (this.nXt = this.Owner.CheckGetComponent(1)),
      (this.hwe = Rotator_1.Rotator.Create());
  }
  SetRotateParam(t, e = 1, o = !0) {
    (this.ABr = 0 !== t ? MathCommon_1.MathCommon.RoundAngle / t : 0),
      (this.UBr = e),
      (this.PBr = o);
  }
  StartRotate() {
    (this.Rxe = !0), (this.NeedTick = !0);
  }
  StopRotate() {
    (this.Rxe = !1), (this.NeedTick = !1);
  }
  OnTick(t) {
    var e;
    !this.Rxe ||
      this.ABr <= 0 ||
      ((e = this.PBr ? 1 : -1),
      (t = this.ABr * t * CommonDefine_1.MILLIONSECOND_PER_SECOND * e),
      0 === this.UBr
        ? (this.hwe.Pitch = t)
        : 1 === this.UBr
          ? (this.hwe.Yaw = t)
          : 2 === this.UBr && (this.hwe.Roll = t),
      this.nXt.Actor.K2_AddActorLocalRotation(
        this.hwe.ToUeRotator(),
        !1,
        void 0,
        !1,
      ));
  }
};
(UiModelRotateComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(9)],
  UiModelRotateComponent,
)),
  (exports.UiModelRotateComponent = UiModelRotateComponent);
//# sourceMappingURL=UiModelRotateComponent.js.map
