"use strict";
var CharacterSplineMoveComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, s, e) {
      var h,
        r = arguments.length,
        o =
          r < 3
            ? i
            : null === e
              ? (e = Object.getOwnPropertyDescriptor(i, s))
              : e;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, i, s, e);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (h = t[a]) &&
            (o = (r < 3 ? h(o) : 3 < r ? h(i, s, o) : h(i, s)) || o);
      return 3 < r && o && Object.defineProperty(i, s, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSplineMoveComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  CharacterNameDefines_1 = require("../../../Character/Common/CharacterNameDefines"),
  CharacterAttributeTypes_1 = require("../../../Character/Common/Component/Abilities/CharacterAttributeTypes"),
  CharacterUnifiedStateTypes_1 = require("../../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  BaseSplineMoveComponent_1 = require("../../../Common/Component/BaseSplineMoveComponent"),
  MAX_INPUT_COS = 0.707,
  FORWARD_BACKWARD_THRESHOLD = 0.5,
  FORECAST_DIST = 500,
  DAMPING = 0.96,
  STANDARD_FPS = 60;
let CharacterSplineMoveComponent =
  (CharacterSplineMoveComponent_1 = class CharacterSplineMoveComponent extends (
    BaseSplineMoveComponent_1.BaseSplineMoveComponent
  ) {
    constructor() {
      super(...arguments),
        (this.isn = void 0),
        (this.rJo = void 0),
        (this.Gce = void 0),
        (this.oRe = void 0),
        (this.osn = void 0),
        (this.LastRightSpeed = 0),
        (this.LastForward = !0),
        (this.MinTurnAngle = 0),
        (this.MaxTurnAngle = 0);
    }
    static get SplineMoveConfig() {
      return (
        this.msn ||
          (this.msn = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            this.DaPath,
            UE.Object,
          )),
        this.msn
      );
    }
    OnStart() {
      return (
        super.OnStart(),
        (0, RegisterComponent_1.isComponentInstance)(this.ActorComp, 3) &&
          (this.isn = this.ActorComp),
        (this.Gce = this.Entity.GetComponent(176)),
        (this.oRe = this.Entity.GetComponent(175)),
        (this.rJo = this.Entity.GetComponent(173)),
        (this.osn = this.Entity.GetComponent(171)),
        !0
      );
    }
    OnTick(t) {
      var i = this.CurrentSplineMoveParams;
      i
        ? (!this.SplineMoveParamsMap.has(i.Id) &&
            i.EarliestLeaveTime <= Time_1.Time.NowSeconds &&
            !this.SelectNextSplineMove()) ||
          (this.UpdateSplineLocationAndDirection(),
          this.UpdateLastSplineLocationAndDirection(),
          (i = t * MathUtils_1.MathUtils.MillisecondToSecond),
          this.PositionAdjust(this.SplineTimeKey, i),
          this.Csn(),
          this.LastLocation.DeepCopy(this.TargetLocation))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "Tick in No SplineMove!"),
          (this.DisableKey = this.Disable(
            "[SplineMoveComponent.OnTick] this.CurrentSplineMoveParams为false",
          )));
    }
    PositionAdjust(t, i) {
      switch (this.CurrentSplineMoveType) {
        case "RacingTrack":
          this.nMc(t, i);
          break;
        case "PathLine":
        case "SlideTrack":
          this.PositionAdjustCommon(t, i);
      }
    }
    nMc(t, i) {
      this.TargetLocation.DeepCopy(this.ActorComp.ActorLocationProxy),
        this.gsn(i),
        this.CheckAndLimitOnlyForwardMove() ||
          (this.LastSplineDirection.Normalize() && (this.sMc(), this.aMc()),
          (this.LastTimeKey = t)),
        this.LimitRightAxisMove(),
        this.MoveToTargetLocation(i);
    }
    PositionAdjustCommon(t, i) {
      this.TargetLocation.DeepCopy(this.ActorComp.ActorLocationProxy),
        this.CheckAndLimitOnlyForwardMove() ||
          (this.LastSplineDirection.Normalize() && this.sMc(),
          (this.LastTimeKey = t)),
        this.LimitRightAxisMove(),
        this.MoveToTargetLocation(i);
    }
    MoveToTargetLocation(t) {
      Vector_1.Vector.DistSquared(
        this.ActorComp.ActorLocationProxy,
        this.TargetLocation,
      ) <= MathUtils_1.MathUtils.SmallNumber ||
        (this.Gce
          ? (this.TargetLocation.Subtraction(
              this.ActorComp.ActorLocationProxy,
              this.OffsetVector,
            ),
            this.Gce.MoveCharacter(this.OffsetVector, t))
          : this.ActorComp.SetActorLocation(
              this.TargetLocation.ToUeVector(),
              "样条移动",
              !1,
            ));
    }
    sMc() {
      this.isn &&
        (this.TmpVector.DeepCopy(this.isn.ActorVelocityProxy),
        Quat_1.Quat.FindBetween(
          this.LastSplineDirection,
          this.SplineDirection,
          this.TmpQuat,
        ),
        this.TmpQuat.RotateVector(this.TmpVector, this.TmpVector),
        this.isn.SetActorVelocity(this.TmpVector));
    }
    aMc() {
      var t;
      "RacingTrack" === this.CurrentSplineMoveParamsInternal.Type &&
        (this.TargetLocation.Subtraction(
          this.LastSplineLocation,
          this.OffsetVector,
        ),
        (this.OffsetVector.Z = 0),
        this.LastSplineDirection.Multiply(
          this.OffsetVector.DotProduct(this.LastSplineDirection),
          this.TmpVector,
        ),
        this.OffsetVector.SubtractionEqual(this.TmpVector),
        this.TmpQuat.RotateVector(this.OffsetVector, this.TmpVector),
        (t = this.TargetLocation.Z),
        this.SplineLocation.Addition(this.TmpVector, this.TargetLocation),
        (this.TargetLocation.Z = t));
    }
    gsn(s) {
      if (
        this.isn &&
        "RacingTrack" === this.CurrentSplineMoveParamsInternal.Type
      ) {
        var e = this.isn.InputDirectProxy;
        (this.TmpVector.X = -this.SplineDirection.Y),
          (this.TmpVector.Y = this.SplineDirection.X),
          (this.TmpVector.Z = 0);
        let t = this.TmpVector.DotProduct(e);
        t < -this.CurrentSplineMoveParamsInternal.InputLimitSin
          ? (t = -this.CurrentSplineMoveParamsInternal.InputLimitSin)
          : t > this.CurrentSplineMoveParamsInternal.InputLimitSin &&
            (t = this.CurrentSplineMoveParamsInternal.InputLimitSin);
        var e = this.Gce.CharacterMovement.MaxWalkSpeed * t,
          h = this.Gce.CharacterMovement.MaxAcceleration,
          r = e - this.LastRightSpeed,
          h = h * s;
        let i = 0;
        Math.abs(r) > h
          ? ((i =
              r * this.LastRightSpeed < 0
                ? this.LastRightSpeed * Math.pow(DAMPING, s * STANDARD_FPS)
                : this.LastRightSpeed),
            (i += Math.sign(r) * h))
          : (i = e),
          this.TmpVector.MultiplyEqual(((this.LastRightSpeed + i) / 2) * s),
          this.TargetLocation.AdditionEqual(this.TmpVector),
          (this.LastRightSpeed = i);
      }
    }
    Csn() {
      this.isn &&
        "AirPassage" !== this.CurrentSplineMoveType &&
        (this.rJo?.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Climb
          ? this.hMc()
          : this.lMc(this.isn.InputDirectProxy));
    }
    hMc() {
      var t = this.isn.InputDirectProxy;
      ModelManager_1.ModelManager.CameraModel.CameraRotator.Quaternion(
        this.TmpQuat,
      ),
        this.TmpQuat.RotateVector(t, this.TmpVector),
        this.isn.SetInputDirect(this.TmpVector),
        this.lMc(t),
        this.ActorComp.ActorQuatProxy.Inverse(this.TmpQuat),
        this.TmpQuat.RotateVector(t, this.TmpVector),
        (this.TmpVector.Z = 0),
        this.isn.SetInputDirect(this.TmpVector);
    }
    lMc(t) {
      switch (this.CurrentSplineMoveParamsInternal.Type) {
        case "RacingTrack":
          this._Mc(t);
          break;
        case "PathLine":
          this.cMc(t);
          break;
        case "SlideTrack":
          this.uMc(t);
      }
    }
    uMc(t) {
      var i = this.CurrentSplineMoveParamsInternal,
        s =
          (this.SplineQuat.Inverse(this.TmpQuat),
          this.ActorComp.ActorLocationProxy.Subtraction(
            this.SplineLocation,
            this.TmpVector,
          ),
          this.TmpQuat.RotateVector(this.TmpVector, this.TmpVector),
          i.EdgeLimitCurve.GetCurrentValue(
            Math.abs(this.TmpVector.Y) / i.MaxOffsetDist,
          ));
      let e = -i.InputLimitAngle,
        h = i.InputLimitAngle;
      this.TmpVector.Y < 0 ? (e *= 1 - s) : (h *= 1 - s),
        (this.MinTurnAngle = e),
        (this.MaxTurnAngle = h),
        t.IsNearlyZero()
          ? this.SplineQuat.RotateVector(
              Vector_1.Vector.ForwardVectorProxy,
              this.TmpVector,
            )
          : (ModelManager_1.ModelManager.CameraModel.CameraRotator.Quaternion(
              this.TmpQuat,
            ),
            this.TmpQuat.RotateVector(
              Vector_1.Vector.ForwardVectorProxy,
              this.TmpVector,
            ),
            GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
              this.ActorComp,
              this.TmpVector,
            ),
            this.TmpVector.IsNearlyZero() &&
              this.TmpQuat.RotateVector(
                Vector_1.Vector.UpVectorProxy,
                this.TmpVector,
              ),
            this.ActorComp.ActorGravityDirectProxy.UnaryNegation(
              this.TmpVector1,
            ),
            MathUtils_1.MathUtils.LookRotationUpFirst(
              this.TmpVector,
              this.TmpVector1,
              this.TmpQuat,
            ),
            this.TmpQuat.Inverse(this.TmpQuat),
            this.TmpQuat.RotateVector(t, this.TmpVector),
            (i =
              this.TmpVector.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg),
            (s =
              MathUtils_1.MathUtils.Clamp(i, e, h) *
              MathUtils_1.MathUtils.DegToRad),
            this.TmpVector.Set(Math.cos(s), Math.sin(s), 0),
            this.SplineQuat.RotateVector(this.TmpVector, this.TmpVector)),
        this.isn.SetInputDirect(this.TmpVector),
        this.isn.SetInputFacing(this.TmpVector, !0);
    }
    cMc(t) {
      var i = this.CurrentSplineMoveParamsInternal,
        s = t.DotProduct(this.SplineDirection);
      let e = 0;
      if (i.OnlyForward) {
        if (t.DotProduct(this.SplineDirection) < MAX_INPUT_COS)
          return void this.isn.ClearInput(!0);
        e = 1;
      } else {
        if (Math.abs(s) < MAX_INPUT_COS) return void this.isn.ClearInput(!0);
        e = Math.sign(s);
      }
      this.SplineDirection.Multiply(e * FORECAST_DIST, this.TmpVector),
        this.TmpVector.AdditionEqual(this.SplineLocation),
        this.TmpVector.SubtractionEqual(this.TargetLocation),
        (this.TmpVector.Z = 0),
        this.TmpVector.Normalize(),
        this.isn.SetInputDirect(this.TmpVector),
        this.isn.SetInputFacing(this.TmpVector, !0);
    }
    _Mc(t) {
      var i = this.CurrentSplineMoveParamsInternal;
      this.isn.SetInputFacing(this.SplineDirection, !0),
        t.IsNearlyZero() ||
        ((t = this.SplineDirection.DotProduct(t)), i.OnlyForward) ||
        t >
          (this.LastForward
            ? -FORWARD_BACKWARD_THRESHOLD
            : FORWARD_BACKWARD_THRESHOLD)
          ? ((this.LastForward = !0),
            this.isn.SetInputDirect(this.SplineDirection))
          : ((this.LastForward = !1),
            this.SplineDirection.UnaryNegation(this.TmpVector),
            this.isn.SetInputDirect(this.TmpVector));
    }
    StartSplineMoveInternal(t, i) {
      this.DisableKey &&
        (this.Enable(
          this.DisableKey,
          "SplineMoveComponent.StartSplineMoveInternal",
        ),
        (this.DisableKey = void 0),
        this.OnSplineMoveEnable(t, i)),
        this.AddSplineMoveParams(t, i),
        this.SelectNextSplineMove(),
        (this.LastRightSpeed = 0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Movement",
            6,
            "StartSplineMove",
            ["Spline Id", t],
            ["Actor", this.ActorComp.Owner.GetName()],
            ["StackCount", this.SplineStack.length],
          );
    }
    ApplySplineMoveDaConfig(t) {
      "SlideTrack" !== t.Type &&
        (this.Gce?.SetTurnRate(
          CharacterSplineMoveComponent_1.SplineMoveConfig.TurnRate,
        ),
        this.Gce?.SetAirControl(
          CharacterSplineMoveComponent_1.SplineMoveConfig.AirControl,
        ),
        this.Gce?.SetOverrideMaxFallingSpeed(
          CharacterSplineMoveComponent_1.SplineMoveConfig.MaxFlySpeed,
        ),
        this.TagComp?.AddTag(-451106150),
        this.osn?.SetBaseValue(
          Protocol_1.Aki.Protocol.Vks.Proto_Jump,
          CharacterAttributeTypes_1.PER_TEN_THOUSAND *
            CharacterSplineMoveComponent_1.SplineMoveConfig.JumpHeightRate,
        ),
        (t = this.oRe?.MainAnimInstance),
        UE.KuroStaticLibrary.IsObjectClassByName(
          t,
          CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
        )) &&
        t.设置跳跃速率(
          CharacterSplineMoveComponent_1.SplineMoveConfig.JumpTimeScale,
        );
    }
    ResetSplineMoveDaConfig() {
      this.Gce?.ResetTurnRate(),
        this.Gce?.ResetAirControl(),
        this.Gce?.ResetOverrideMaxFallingSpeed(),
        this.TagComp?.RemoveTag(-451106150),
        this.osn?.SetBaseValue(
          Protocol_1.Aki.Protocol.Vks.Proto_Jump,
          CharacterAttributeTypes_1.PER_TEN_THOUSAND,
        );
      var t = this.oRe?.MainAnimInstance;
      UE.KuroStaticLibrary.IsObjectClassByName(
        t,
        CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
      ) && t.设置跳跃速率(1);
    }
    OnSplineMoveEnable(t, i) {
      this.ApplySplineMoveDaConfig(i);
    }
    OnSplineMoveDisable() {
      this.ResetSplineMoveDaConfig();
    }
    OnSelectNextSplineMoveEnd() {
      this.isn?.ClearInput(),
        this.Wzl(),
        this.LastLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
    }
    Wzl() {
      this.CurrentSplineMoveParamsInternal &&
        ((this.MinTurnAngle =
          -this.CurrentSplineMoveParamsInternal.InputLimitAngle),
        (this.MaxTurnAngle =
          this.CurrentSplineMoveParamsInternal.InputLimitAngle));
    }
  });
(CharacterSplineMoveComponent.DaPath =
  "/Game/Aki/Data/Fight/DA_SplineMoveConfig.DA_SplineMoveConfig"),
  (CharacterSplineMoveComponent.msn = void 0),
  (CharacterSplineMoveComponent = CharacterSplineMoveComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(106)],
      CharacterSplineMoveComponent,
    )),
  (exports.CharacterSplineMoveComponent = CharacterSplineMoveComponent);
//# sourceMappingURL=CharacterSplineMoveComponent.js.map
