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
      for (var n = t.length - 1; 0 <= n; n--)
        (h = t[n]) && (r = (o < 3 ? h(r) : 3 < o ? h(i, s, r) : h(i, s)) || r);
    return 3 < o && r && Object.defineProperty(i, s, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseSplineMoveComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  CurveUtils_1 = require("../../../../Core/Utils/Curve/CurveUtils"),
  PowerCurve3_1 = require("../../../../Core/Utils/Curve/PowerCurve3"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  MAX_OFFSET_INCREASE = 1e5,
  HEIGHT_LIMIT = 1e5;
class SplineMoveParams {
  constructor(t, i, s) {
    (this.Id = t),
      (this.Config = i),
      (this.Spline = s),
      (this.CurrentMaxOffsetSquared = 0),
      (this.CurrentMaxOffset = 0),
      (this.InputLimitCos = 0),
      (this.InputLimitSin = 0),
      (this.Type = "PathLine"),
      (this.MaxOffsetDist = 0),
      (this.OnlyForward = !1),
      (this.InputLimitAngle = 0),
      (this.LayerVerticalLimit = HEIGHT_LIMIT),
      (this.EdgeLimitCurve = CurveUtils_1.CurveUtils.DefaultLinear),
      (this.EarliestLeaveTime = 0),
      (this.MaxSoarSplineSpeed = 0),
      (this.SoarFriction = 0),
      (this.SoarSprintLimit = 0),
      (this.SplineAnalyzeData = void 0),
      (this.Type = i.Type),
      (this.MaxOffsetDist = i.MaxOffsetDistance ?? 0),
      (this.OnlyForward = i.IsOneWay ?? !1),
      (this.LayerVerticalLimit = i.LayerVerticalLimit ?? HEIGHT_LIMIT),
      "RacingTrack" === i.Type
        ? ((this.InputLimitAngle = i.DirectionAngleLimit),
          (this.InputLimitCos = Math.cos(
            this.InputLimitAngle * MathUtils_1.MathUtils.DegToRad,
          )),
          (this.InputLimitSin = Math.sin(
            this.InputLimitAngle * MathUtils_1.MathUtils.DegToRad,
          )))
        : "SlideTrack" === i.Type
          ? ((this.InputLimitAngle = i.DirectionAngleLimit),
            (this.EdgeLimitCurve = new PowerCurve3_1.PowerCurve3(
              i.EdgeLimitCurveFactor,
            )))
          : "AirPassage" === i.Type &&
            ((s =
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                t,
              )?.Entity?.GetComponent(257))
              ? ((this.MaxSoarSplineSpeed = s.SplineData.SpeedLimit),
                (this.SoarFriction = s.SplineData.Resistance),
                (this.SoarSprintLimit = s.SplineData.SprintSpeedLimit))
              : ((this.MaxSoarSplineSpeed = 3e3),
                (this.SoarFriction = 0.5),
                (this.SoarSprintLimit = 0))),
      (this.CurrentMaxOffset = this.MaxOffsetDist + MAX_OFFSET_INCREASE),
      (this.CurrentMaxOffsetSquared =
        this.CurrentMaxOffset * this.CurrentMaxOffset),
      "AirPassage" === this.Type
        ? ((this.EarliestLeaveTime = Time_1.Time.NowSeconds + 1),
          (this.SplineAnalyzeData =
            ModelManager_1.ModelManager.GameSplineModel?.GetSplineAnalyzeData(
              t,
            )))
        : (this.EarliestLeaveTime = Time_1.Time.NowSeconds);
  }
}
let BaseSplineMoveComponent = class BaseSplineMoveComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.TagComp = void 0),
      (this.DisableKey = void 0),
      (this.SplineMoveParamsMap = new Map()),
      (this.SplineStack = new Array()),
      (this.CurrentSplineMoveParamsInternal = void 0),
      (this.SplineTimeKey = 0),
      (this.SplineDirection = Vector_1.Vector.Create()),
      (this.SplineLocation = Vector_1.Vector.Create()),
      (this.SplineQuat = Quat_1.Quat.Create()),
      (this.LastTimeKey = 0),
      (this.LastSplineLocation = Vector_1.Vector.Create()),
      (this.LastSplineDirection = Vector_1.Vector.Create()),
      (this.LastLocation = Vector_1.Vector.Create()),
      (this.TargetLocation = Vector_1.Vector.Create()),
      (this.OffsetVector = Vector_1.Vector.Create()),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpVector1 = Vector_1.Vector.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()),
      (this.TmpQuat1 = Quat_1.Quat.Create()),
      (this.TmpRotator = Rotator_1.Rotator.Create());
  }
  get CurrentSplineMoveType() {
    return this.CurrentSplineMoveParamsInternal
      ? this.CurrentSplineMoveParamsInternal.Type
      : "PathLine";
  }
  get CurrentSplineMoveParams() {
    return this.CurrentSplineMoveParamsInternal;
  }
  OnStart() {
    return (
      (this.DisableKey = this.Disable(
        "[SplineMoveComponent.OnStart] 默认Disable",
      )),
      (this.ActorComp = this.Entity.GetComponent(1)),
      (this.TagComp = this.Entity.GetComponent(203)),
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
        this.LastLocation.DeepCopy(this.TargetLocation))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Movement", 6, "Tick in No SplineMove!"),
        (this.DisableKey = this.Disable(
          "[SplineMoveComponent.OnTick] this.CurrentSplineMoveParams为false",
        )));
  }
  OnEnd() {
    return this.ClearSplineMoveParams(), !0;
  }
  PositionAdjust(t, i) {
    switch (this.CurrentSplineMoveType) {
      case "RacingTrack":
      case "PathLine":
      case "SlideTrack":
        this.PositionAdjustCommon(t, i);
    }
  }
  PositionAdjustCommon(t, i) {
    this.TargetLocation.DeepCopy(this.ActorComp.ActorLocationProxy),
      this.CheckAndLimitOnlyForwardMove() || (this.LastTimeKey = t),
      this.LimitRightAxisMove(),
      this.MoveToTargetLocation(i);
  }
  LimitRightAxisMove() {
    var t,
      i = this.CurrentSplineMoveParamsInternal,
      s =
        (this.SplineLocation.Subtraction(
          this.TargetLocation,
          this.OffsetVector,
        ),
        GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
          this.ActorComp,
          this.OffsetVector,
        ),
        this.SplineDirection.Multiply(
          this.OffsetVector.DotProduct(this.SplineDirection),
          this.TmpVector,
        ),
        this.OffsetVector.SubtractionEqual(this.TmpVector),
        this.OffsetVector.SizeSquared()),
      e = this.CurrentSplineMoveParamsInternal.CurrentMaxOffset;
    this.CurrentSplineMoveParamsInternal.CurrentMaxOffsetSquared < s
      ? 0 < e
        ? ((t = Math.sqrt(s)),
          this.OffsetVector.Multiply((t - e) / t, this.TmpVector),
          this.TargetLocation.AdditionEqual(this.TmpVector))
        : (GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
            this.ActorComp,
            this.OffsetVector,
          ),
          this.TargetLocation.AdditionEqual(this.OffsetVector))
      : i.CurrentMaxOffset > i.MaxOffsetDist &&
        (s > MathUtils_1.MathUtils.Square(i.MaxOffsetDist)
          ? ((i.CurrentMaxOffset = Math.sqrt(s)),
            (i.CurrentMaxOffsetSquared = s))
          : ((i.CurrentMaxOffset = i.MaxOffsetDist),
            (i.CurrentMaxOffsetSquared = MathUtils_1.MathUtils.Square(
              i.MaxOffsetDist,
            ))));
  }
  MoveToTargetLocation(t) {
    Vector_1.Vector.DistSquared(
      this.ActorComp.ActorLocationProxy,
      this.TargetLocation,
    ) <= MathUtils_1.MathUtils.SmallNumber ||
      this.ActorComp.SetActorLocation(
        this.TargetLocation.ToUeVector(),
        "样条移动",
        !1,
      );
  }
  CheckAndLimitOnlyForwardMove() {
    this.ActorComp.ActorLocationProxy.Subtraction(
      this.LastLocation,
      this.TmpVector,
    );
    var t = 0 < this.TmpVector.DotProduct(this.SplineDirection);
    if (!this.CurrentSplineMoveParamsInternal.OnlyForward || t) return !1;
    this.LastLocation.Subtraction(this.TargetLocation, this.OffsetVector);
    t = this.SplineDirection.DotProduct(this.OffsetVector);
    return (
      this.SplineDirection.Multiply(t, this.TmpVector),
      this.TargetLocation.AdditionEqual(this.TmpVector),
      !0
    );
  }
  StartSplineMove(t, i) {
    this.StartMoveConditionCheck(t, i) && this.StartSplineMoveInternal(t, i);
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
  EndSplineMove(t) {
    this.EndMoveConditionCheck(t) &&
      (this.RemoveSplineMoveParams(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Movement",
          6,
          "EndSplineMove",
          ["Spline Id", t],
          ["Actor", this.ActorComp.Owner.GetName()],
          ["StackCount", this.SplineStack.length],
        ),
      this.CurrentSplineMoveParamsInternal.EarliestLeaveTime >
        Time_1.Time.NowSeconds || this.SelectNextSplineMove());
  }
  ForceStopSplineMove() {
    this.DisableKey ||
      ((this.DisableKey = this.Disable(
        "SplineMoveComponent.ForceStopSplineMove",
      )),
      this.OnSplineMoveDisable()),
      (this.CurrentSplineMoveParamsInternal = void 0),
      this.ClearSplineMoveParams();
  }
  StartMoveConditionCheck(t, i) {
    return (
      !this.SplineStack.length ||
      this.SplineStack[this.SplineStack.length - 1] !== t
    );
  }
  EndMoveConditionCheck(t) {
    return !!this.SplineMoveParamsMap.get(t);
  }
  SelectNextSplineMove() {
    var t;
    return (
      this.SplineStack.length
        ? ((t = this.SplineMoveParamsMap.get(
            this.SplineStack[this.SplineStack.length - 1],
          )),
          (this.CurrentSplineMoveParamsInternal = t),
          this.UpdateSplineLocationAndDirection())
        : (this.DisableKey ||
            ((this.DisableKey = this.Disable(
              "[SplineMoveComponent.EndSplineMove] 没有下一个SplineMove",
            )),
            this.OnSplineMoveDisable()),
          (this.CurrentSplineMoveParamsInternal = void 0)),
      this.OnSelectNextSplineMoveEnd(),
      !!this.CurrentSplineMoveParams
    );
  }
  AddSplineMoveParams(t, i) {
    var s,
      e = this.SplineMoveParamsMap.get(t);
    e ||
      ((s =
        ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
          t,
          this.Entity.Id,
          1,
        )),
      (e = new SplineMoveParams(t, i, s)),
      this.SplineMoveParamsMap.set(t, e)),
      this.SplineStack.push(t);
  }
  RemoveSplineMoveParams(t) {
    for (
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
        t,
        this.Entity.Id,
        1,
      ),
        this.SplineMoveParamsMap.delete(t);
      this.SplineStack.length &&
      !this.SplineMoveParamsMap.has(
        this.SplineStack[this.SplineStack.length - 1],
      );

    )
      this.SplineStack.length = this.SplineStack.length - 1;
  }
  ClearSplineMoveParams() {
    for (var [t] of this.SplineMoveParamsMap)
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
        t,
        this.Entity.Id,
        1,
      );
    this.SplineMoveParamsMap.clear(), (this.SplineStack.length = 0);
  }
  OnSplineMoveEnable(t, i) {}
  OnSplineMoveDisable() {}
  OnSelectNextSplineMoveEnd() {
    this.LastLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
  }
  UpdateSplineLocationAndDirection() {
    var t = this.CurrentSplineMoveParams.Spline,
      i = t.D_FindInputKeyClosestToWorldLocationInGravity(
        this.ActorComp.ActorLocationProxy.ToUeVector(),
        this.ActorComp.ActorGravityDirectProxy.ToUeVectorOld(),
        this.CurrentSplineMoveParams.LayerVerticalLimit,
      );
    (this.SplineTimeKey = i),
      this.SplineLocation.FromUeVector(t.D_GetLocationAtSplineInputKey(i, 1)),
      this.SplineDirection.DeepCopy(t.GetDirectionAtSplineInputKey(i, 1)),
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
        this.ActorComp,
        this.SplineDirection,
      ),
      this.SplineDirection.Normalize(),
      this.TmpVector.DeepCopy(this.ActorComp.ActorGravityDirectProxy),
      this.TmpVector.UnaryNegation(this.TmpVector),
      MathUtils_1.MathUtils.LookRotationUpFirst(
        this.SplineDirection,
        this.TmpVector,
        this.SplineQuat,
      );
  }
  UpdateLastSplineLocationAndDirection() {
    var t = this.CurrentSplineMoveParamsInternal.Spline;
    this.LastSplineLocation.FromUeVector(
      t.D_GetLocationAtSplineInputKey(this.LastTimeKey, 1),
    ),
      this.LastSplineDirection.FromUeVector(
        t.GetDirectionAtSplineInputKey(this.LastTimeKey, 1),
      ),
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
        this.ActorComp,
        this.LastSplineDirection,
      ),
      this.LastSplineDirection.Normalize();
  }
};
(BaseSplineMoveComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(105)],
  BaseSplineMoveComponent,
)),
  (exports.BaseSplineMoveComponent = BaseSplineMoveComponent);
//# sourceMappingURL=BaseSplineMoveComponent.js.map
