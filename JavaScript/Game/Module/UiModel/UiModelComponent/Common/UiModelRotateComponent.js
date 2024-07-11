"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    let s;
    const n = arguments.length;
    let h =
      n < 3 ? e : i === null ? (i = Object.getOwnPropertyDescriptor(e, o)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      h = Reflect.decorate(t, e, o, i);
    else
      for (let r = t.length - 1; r >= 0; r--)
        (s = t[r]) && (h = (n < 3 ? s(h) : n > 3 ? s(e, o, h) : s(e, o)) || h);
    return n > 3 && h && Object.defineProperty(e, o, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelRotateComponent = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
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
    (this.ABr = t !== 0 ? MathCommon_1.MathCommon.RoundAngle / t : 0),
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
    let e;
    !this.Rxe ||
      this.ABr <= 0 ||
      ((e = this.PBr ? 1 : -1),
      (t = this.ABr * t * CommonDefine_1.MILLIONSECOND_PER_SECOND * e),
      this.UBr === 0
        ? (this.hwe.Pitch = t)
        : this.UBr === 1
          ? (this.hwe.Yaw = t)
          : this.UBr === 2 && (this.hwe.Roll = t),
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
// # sourceMappingURL=UiModelRotateComponent.js.map
