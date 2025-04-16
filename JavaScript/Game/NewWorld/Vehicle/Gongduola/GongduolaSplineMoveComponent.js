"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var s,
      n = arguments.length,
      h =
        n < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, o);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (s = t[r]) && (h = (n < 3 ? s(h) : 3 < n ? s(e, i, h) : s(e, i)) || h);
    return 3 < n && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GongduolaSplineMoveComponent = void 0);
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  VehicleSplineMoveComponent_1 = require("../Common/VehicleSplineMoveComponent"),
  GongduolaConfig_1 = require("./GongduolaConfig"),
  UNLOCK_TURN_INPUT_MIN_ANGLE = 10,
  INPUT_ADJUST_FORWARD_MIN_YAW = 45,
  INPUT_ADJUST_FORWARD_MAX_YAW = 60;
let GongduolaSplineMoveComponent = class GongduolaSplineMoveComponent extends VehicleSplineMoveComponent_1.VehicleSplineMoveComponent {
  constructor() {
    super(...arguments), (this.LastLockedInput = Vector_1.Vector.Create());
  }
  InputAdjustSlideTrack(t) {
    this.SplineQuat.Inverse(this.TmpQuat),
      this.ActorComp.ActorLocationProxy.Subtraction(
        this.SplineLocation,
        this.TmpVector1,
      ),
      this.TmpQuat.RotateVector(this.TmpVector1, this.TmpVector),
      this.TmpQuat.Multiply(this.ActorComp.ActorQuatProxy, this.TmpQuat1),
      this.TmpQuat1.Rotator(this.TmpRotator);
    var e = this.CurrentSplineMoveParamsInternal,
      i = e.EdgeLimitCurve.GetCurrentValue(
        Math.abs(this.TmpVector.Y) / e.MaxOffsetDist,
      );
    let o = -e.InputLimitAngle,
      s = e.InputLimitAngle;
    this.TmpVector.Y < 0 ? (o *= 1 - i) : (s *= 1 - i),
      this.TmpVector1.DeepCopy(t),
      this.ConvertToTriangleInput(this.TmpVector1),
      (this.TmpVector1.X = 1),
      this.AdjustInputForValid(
        this.TmpVector1,
        this.TmpVector.Y,
        this.TmpRotator.Yaw,
        o,
        s,
      ),
      this.ConvertToCircleInput(this.TmpVector1),
      this.CharActorComp?.SetInputDirect(this.TmpVector1);
  }
  ConvertToTriangleInput(t) {
    var e = t.GetAbsMax();
    t.Size() < 1 ||
      e < MathUtils_1.MathUtils.KindaSmallNumber ||
      t.MultiplyEqual(1 / e);
  }
  ConvertToCircleInput(t) {
    t.Size() < 1 || t.Normalize();
  }
  AdjustInputForValid(t, e, i, o, s) {
    if (this.CurrentSplineMoveParams?.OnlyForward) {
      var n = Math.min(s - i, i - o),
        n =
          ((this.TmpVector1.Y * this.LastLockedInput.Y <= 0 ||
            n > UNLOCK_TURN_INPUT_MIN_ANGLE) &&
            this.LastLockedInput.Reset(),
          this.CurrentSplineMoveParams),
        n = n.CurrentMaxOffset <= n.MaxOffsetDist,
        o = MathUtils_1.MathUtils.InRangeArray(i, [o, s]);
      if (!n)
        return 90 <= Math.abs(i)
          ? void (t.Y = -Math.sign(e))
          : void (0 < (0 < e ? 1 : -1) * (0 < i ? 1 : -1)
              ? (t.Y = -Math.sign(i))
              : ((n =
                  (s = Math.abs(i)) < INPUT_ADJUST_FORWARD_MIN_YAW
                    ? 1
                    : s > INPUT_ADJUST_FORWARD_MAX_YAW
                      ? -1
                      : 0),
                (t.Y = n * Math.sign(i))));
      o
        ? 0 < this.LastLockedInput.Y * t.Y && (t.Y = 0)
        : (this.LastLockedInput.DeepCopy(t), (t.Y = -Math.sign(i)));
    }
  }
  ApplySplineMoveDaConfig() {
    var t;
    this.ExtraMoveParams &&
      (t = this.Entity.GetComponent(242))?.Config instanceof
        GongduolaConfig_1.GongduolaConfig &&
      ((t.Config.BaseMaxSpeed = this.ExtraMoveParams.ForwardSpeed),
      (t.Config.BaseMaxAcceleration = this.ExtraMoveParams.ForwardAcceleration),
      t.RefreshMoveConfigFromVehicleConfig(),
      t.SetEnableInputSprint(!this.ExtraMoveParams.DisableSprint));
  }
  ResetSplineMoveDaConfig() {
    var t = this.Entity.GetComponent(242);
    t?.ResetVehicleConfig(!0), t?.SetEnableInputSprint(!0);
  }
};
(GongduolaSplineMoveComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(108)],
  GongduolaSplineMoveComponent,
)),
  (exports.GongduolaSplineMoveComponent = GongduolaSplineMoveComponent);
//# sourceMappingURL=GongduolaSplineMoveComponent.js.map
