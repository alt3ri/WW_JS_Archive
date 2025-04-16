"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  IEntity_1 = require("../../../../UniverseEditor/Interface/IEntity"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  PI = 3.1416,
  NAVIGATION_END_TIME = 5e3,
  NAVIGATION_COMPLETE_DISTANCE = 20;
class RangeEntityInfo {
  constructor(t, i) {
    (this.Transform = Transform_1.Transform.Create()),
      (this.Shape = "Box"),
      (this.NoRotation = !0),
      (this.Shape = t.Type),
      this.Transform.SetScale3D(Vector_1.Vector.OneVectorProxy),
      i &&
        ((t = RangeEntityInfo.TmpVector1),
        RangeEntityInfo.FromVectorInfo(i.Pos, t),
        this.Transform.SetLocation(t),
        RangeEntityInfo.FromVectorInfo(i.Rot, t),
        RangeEntityInfo.TmpRotator.Set(t.X, t.Y, t.Z),
        this.Transform.SetRotation(RangeEntityInfo.TmpRotator.Quaternion()),
        RangeEntityInfo.TmpRotator.Equals(Rotator_1.Rotator.ZeroRotatorProxy) ||
          (this.NoRotation = !1));
  }
  static FromVectorInfo(t, i) {
    (i.X = t?.X ?? 0), (i.Y = t?.Y ?? 0), (i.Z = t?.Z ?? 0);
  }
  InverseTransformNoScale(t, i) {
    t.Subtraction(this.Transform.GetLocation(), i),
      this.NoRotation ||
        (this.Transform.GetRotation().Inverse(RangeEntityInfo.TmpQuat),
        RangeEntityInfo.TmpQuat.RotateVector(i, i));
  }
  IsInRange(t) {
    return !0;
  }
}
(RangeEntityInfo.TmpVector1 = Vector_1.Vector.Create()),
  (RangeEntityInfo.TmpVector2 = Vector_1.Vector.Create()),
  (RangeEntityInfo.TmpVector3 = Vector_1.Vector.Create()),
  (RangeEntityInfo.TmpRotator = Rotator_1.Rotator.Create()),
  (RangeEntityInfo.TmpQuat = Quat_1.Quat.Create());
class SphereRangeEntityInfo extends RangeEntityInfo {
  constructor(t, i) {
    super(t, i), (this.Radius = 0), (this.Radius = t.Radius);
    var i = RangeEntityInfo.TmpVector1,
      s = RangeEntityInfo.TmpVector2;
    RangeEntityInfo.FromVectorInfo(t.Center, i),
      this.Transform.GetLocation().Addition(i, s),
      this.Transform.SetLocation(s),
      (this.NoRotation = !0);
  }
  IsInRange(t) {
    return (
      this.InverseTransformNoScale(t, RangeEntityInfo.TmpVector3),
      RangeEntityInfo.TmpVector3.Size() - this.Radius <= 0
    );
  }
}
class BoxRangeEntityInfo extends RangeEntityInfo {
  constructor(t, i) {
    super(t, i),
      (this.Bounds = Vector_1.Vector.Create()),
      this.Bounds.Set(t.Size.X ?? 0, t.Size.Y ?? 0, t.Size.Z ?? 0);
    var i = RangeEntityInfo.TmpVector1,
      s = RangeEntityInfo.TmpVector2;
    RangeEntityInfo.FromVectorInfo(t.Center, i),
      this.Transform.GetLocation().Addition(i, s),
      this.Transform.SetLocation(s),
      RangeEntityInfo.FromVectorInfo(t.Rotator, i),
      RangeEntityInfo.TmpRotator.Set(i.X, i.Y, i.Z),
      RangeEntityInfo.TmpRotator.AdditionEqual(
        this.Transform.GetRotation().Rotator(),
      ),
      this.Transform.SetRotation(RangeEntityInfo.TmpRotator.Quaternion()),
      RangeEntityInfo.TmpRotator.Equals(Rotator_1.Rotator.ZeroRotatorProxy) ||
        (this.NoRotation = !1);
  }
  IsInRange(t) {
    return (
      this.InverseTransformNoScale(t, RangeEntityInfo.TmpVector3),
      RangeEntityInfo.TmpVector3.GetAbs(RangeEntityInfo.TmpVector1),
      RangeEntityInfo.TmpVector1.SubtractionEqual(this.Bounds),
      (RangeEntityInfo.TmpVector2.X = Math.max(
        RangeEntityInfo.TmpVector1.X,
        0,
      )),
      (RangeEntityInfo.TmpVector2.Y = Math.max(
        RangeEntityInfo.TmpVector1.Y,
        0,
      )),
      (RangeEntityInfo.TmpVector2.Z = Math.max(
        RangeEntityInfo.TmpVector1.Z,
        0,
      )),
      RangeEntityInfo.TmpVector2.Size() +
        Math.min(0, RangeEntityInfo.TmpVector1.GetMax()) <=
        0
    );
  }
}
class TsTaskAirTerritoryWander extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.Yaw = 0),
      (this.Pitch = 0),
      (this.InnerDiameter = 0),
      (this.OuterDiameter = 0),
      (this.MaxSampleStep = 2),
      (this.GlobalSample = !1),
      (this.TurnSpeed = 0),
      (this.DebugMode = !1),
      (this.TargetLocation = void 0),
      (this.FoundPath = !1),
      (this.ActorComp = void 0),
      (this.MoveComp = void 0),
      (this.CacheVector = void 0),
      (this.CacheForward = void 0),
      (this.OldMovementMode = 1),
      (this.NavigationEndTime = -0),
      (this.RangeInited = !1),
      (this.RangeInfo = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsYaw = 0),
      (this.TsPitch = 0),
      (this.TsInnerDiameter = 0),
      (this.TsOuterDiameter = 0),
      (this.TsMaxSampleStep = 2),
      (this.TsGlobalSample = !1),
      (this.TsTurnSpeed = 0),
      (this.TsDebugMode = !1);
  }
  Constructor() {
    super.Constructor(),
      (this.TargetLocation = void 0),
      (this.FoundPath = !1),
      (this.ActorComp = void 0),
      (this.MoveComp = void 0),
      (this.CacheVector = void 0),
      (this.CacheForward = void 0),
      (this.OldMovementMode = 1),
      (this.NavigationEndTime = -0),
      (this.RangeInited = !1),
      (this.RangeInfo = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsYaw = 0),
      (this.TsPitch = 0),
      (this.TsInnerDiameter = 0),
      (this.TsOuterDiameter = 0),
      (this.TsMaxSampleStep = 2),
      (this.TsGlobalSample = !1),
      (this.TsTurnSpeed = 0),
      (this.TsDebugMode = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsYaw = this.Yaw),
      (this.TsPitch = this.Pitch),
      (this.TsInnerDiameter = this.InnerDiameter),
      (this.TsOuterDiameter = this.OuterDiameter),
      (this.TsMaxSampleStep = this.MaxSampleStep),
      (this.TsGlobalSample = this.GlobalSample),
      (this.TsTurnSpeed = this.TurnSpeed),
      (this.TsDebugMode = this.DebugMode));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s = t.AiController;
    s
      ? ((this.ActorComp = s.CharActorComp),
        this.ActorComp?.Valid &&
        ((s = this.ActorComp.Entity),
        (this.MoveComp = s.GetComponent(176)),
        this.InitRangeEntity(s),
        this.RangeInfo)
          ? (this.CacheVector || (this.CacheVector = Vector_1.Vector.Create()),
            this.FindWanderLocation(),
            (this.NavigationEndTime =
              Time_1.Time.WorldTime + NAVIGATION_END_TIME),
            this.ActorComp.Actor.CharacterMovement &&
              (this.OldMovementMode =
                this.ActorComp.Actor.CharacterMovement.MovementMode))
          : this.Finish(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  ReceiveTickAI(t, i, s) {
    t instanceof TsAiController_1.default &&
    this.FoundPath &&
    this.MoveComp?.CanMove()
      ? Time_1.Time.WorldTime > this.NavigationEndTime ||
        (this.ActorComp?.Actor &&
          this.ActorComp.Actor.KuroSetMovementMode({
            Mode: 5,
            Context: "[TsTaskAirTerritoryWander.ReceiveTickAI]",
          }),
        this.CacheVector.FromUeVector(this.TargetLocation),
        this.CacheVector.Subtraction(
          this.ActorComp.ActorLocationProxy,
          this.CacheVector,
        ),
        (t = this.CacheVector.Size()),
        this.CacheVector.Normalize(),
        t < NAVIGATION_COMPLETE_DISTANCE)
        ? this.Finish(!0)
        : (this.ActorComp.SetInputDirect(this.CacheVector),
          AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
            this.ActorComp,
            this.CacheVector,
            this.TsTurnSpeed,
          ))
      : this.Finish(!1);
  }
  OnClear() {
    this.AIOwner instanceof TsAiController_1.default &&
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
      this.ActorComp?.Actor.KuroSetMovementMode({
        Mode: this.OldMovementMode,
        Context: "[TsTaskAirTerritoryWander.OnClear]",
      }),
      (this.ActorComp = void 0),
      (this.MoveComp = void 0);
  }
  InitRangeEntity(t) {
    if (!this.RangeInited) {
      this.RangeInited = !0;
      (t = t.GetComponent(0).GetPbEntityInitData().ComponentsData),
        (t = (0, IComponent_1.getComponent)(t, "AnimalComponent"));
      if (t && t.MoveRange) {
        var t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
            t.MoveRange,
          ),
          i = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
            t.BlueprintType,
          ),
          t = (0, IEntity_1.decompressEntityData)(t, i),
          s = (0, IComponent_1.getComponent)(
            t.ComponentsData,
            "RangeComponent",
          ),
          e = t.Transform;
        switch (s.Shape.Type) {
          case "Box":
            this.RangeInfo = new BoxRangeEntityInfo(s.Shape, e);
            break;
          case "Sphere":
            this.RangeInfo = new SphereRangeEntityInfo(s.Shape, e);
        }
      }
    }
  }
  RandomPointInSphere(t, i, s) {
    t < 0 ||
      (this.RandomPointInSphereFan(0, t, 0, 2 * PI, 0, PI, s),
      s.AdditionEqual(i));
  }
  RandomPointInSphereFan(t, i, s, e, n, h, o) {
    o.Reset(),
      e < s ||
        i < t ||
        h < n ||
        t < 0 ||
        ((t = MathUtils_1.MathUtils.GetRandomRange(t * t * t, i * i * i)),
        (i = Math.pow(t, 1 / 3)),
        (t = MathUtils_1.MathUtils.GetRandomRange(s, e)),
        (s = MathUtils_1.MathUtils.GetRandomRange(n, h)),
        (o.X = i * Math.cos(t)),
        (o.Y = i * Math.sin(t) * Math.cos(s)),
        (o.Z = i * Math.sin(t) * Math.sin(s)));
  }
  RandomPointInBox(t, i, s) {
    var e, n, h;
    t.GetMin() < 0 ||
      ((e = RangeEntityInfo.TmpVector1),
      (n = MathUtils_1.MathUtils.GetRandomRange(-t.X, t.X)),
      (h = MathUtils_1.MathUtils.GetRandomRange(-t.Y, t.Y)),
      (t = MathUtils_1.MathUtils.GetRandomRange(-t.Z, t.Z)),
      e.Set(n, h, t),
      i.TransformPositionNoScale(e, s));
  }
  FindWanderLocation() {
    this.TargetLocation || (this.TargetLocation = Vector_1.Vector.Create()),
      (this.FoundPath = this.GetNextTargetLocation(this.TargetLocation)),
      this.FoundPath && this.DebugDraw();
  }
  GetNextTargetLocation(t) {
    return (
      !!this.RangeInfo &&
      (this.TsGlobalSample
        ? this.GlobalSamplePoint(t)
        : this.LocalSamplePoint(t))
    );
  }
  GlobalSamplePoint(t) {
    if (!this.RangeInfo) return !1;
    switch (this.RangeInfo.Shape) {
      case "Box":
        var i = this.RangeInfo;
        this.RandomPointInBox(i.Bounds, i.Transform, t);
        break;
      case "Sphere":
        i = this.RangeInfo;
        this.RandomPointInSphere(i.Radius, i.Transform.GetLocation(), t);
        break;
      default:
        return !1;
    }
    return !0;
  }
  LocalSamplePoint(t) {
    if (!this.RangeInfo) return !1;
    this.CacheForward || (this.CacheForward = Vector_1.Vector.Create());
    var i = this.ActorComp.ActorForwardProxy,
      s = this.ActorComp.ActorLocationProxy,
      e = this.ActorComp.ActorRotationProxy,
      n = RangeEntityInfo.TmpVector1,
      h = RangeEntityInfo.TmpVector2,
      o = RangeEntityInfo.TmpRotator;
    this.RangeInfo.Transform.GetLocation().Subtraction(s, n),
      n.GetSafeNormal(h),
      this.CacheForward.DeepCopy(i),
      o.DeepCopy(e);
    let r = 0;
    for (; r < this.TsMaxSampleStep; ) {
      if (
        (this.RandomPointInSphereFan(
          this.TsInnerDiameter,
          this.TsOuterDiameter,
          (o.Yaw - this.TsYaw) * MathUtils_1.MathUtils.DegToRad,
          (o.Yaw + this.TsYaw) * MathUtils_1.MathUtils.DegToRad,
          (o.Pitch - this.TsPitch) * MathUtils_1.MathUtils.DegToRad,
          (o.Pitch + this.TsPitch) * MathUtils_1.MathUtils.DegToRad,
          t,
        ),
        t.AdditionEqual(s),
        this.RangeInfo.IsInRange(t))
      )
        return !0;
      r++,
        this.CacheForward.AdditionEqual(h),
        this.CacheForward.Normalize(),
        this.CacheForward.Rotation(o);
    }
    return t.DeepCopy(this.RangeInfo.Transform.GetLocation()), !0;
  }
  DebugDraw() {
    this.TsDebugMode &&
      GlobalData_1.GlobalData.IsPlayInEditor &&
      (this.DebugDrawRangeEntity(),
      this.DebugDrawLocalSampleRange(),
      this.DebugDrawTargetPoint());
  }
  DebugDrawLocalSampleRange() {
    this.TsGlobalSample ||
      (UE.KismetSystemLibrary.D_DrawDebugCone(
        this,
        this.ActorComp.ActorLocation,
        this.CacheForward.ToUeVector(),
        this.TsOuterDiameter,
        this.TsYaw * MathUtils_1.MathUtils.DegToRad,
        this.TsPitch * MathUtils_1.MathUtils.DegToRad,
        12,
        ColorUtils_1.ColorUtils.LinearGreen,
        3,
      ),
      UE.KismetSystemLibrary.D_DrawDebugCone(
        this,
        this.ActorComp.ActorLocation,
        this.CacheForward.ToUeVector(),
        this.TsInnerDiameter,
        this.TsYaw * MathUtils_1.MathUtils.DegToRad,
        this.TsPitch * MathUtils_1.MathUtils.DegToRad,
        12,
        ColorUtils_1.ColorUtils.LinearRed,
        3,
      ));
  }
  DebugDrawTargetPoint() {
    UE.KismetSystemLibrary.D_DrawDebugSphere(
      this,
      this.TargetLocation.ToUeVector(),
      30,
      10,
      ColorUtils_1.ColorUtils.LinearRed,
      3,
    );
    var t = RangeEntityInfo.TmpVector1;
    t.DeepCopy(this.CacheForward),
      t.MultiplyEqual(500),
      t.AdditionEqual(this.ActorComp.ActorLocationProxy),
      UE.KismetSystemLibrary.D_DrawDebugArrow(
        this,
        this.ActorComp.ActorLocation,
        t.ToUeVector(),
        5,
        ColorUtils_1.ColorUtils.LinearRed,
        3,
        5,
      );
  }
  DebugDrawRangeEntity() {
    if (this.RangeInfo)
      switch (this.RangeInfo.Shape) {
        case "Box":
          var t = this.RangeInfo;
          UE.KismetSystemLibrary.D_DrawDebugBox(
            this,
            t.Transform.GetLocation().ToUeVector(),
            t.Bounds.ToUeVector(),
            ColorUtils_1.ColorUtils.LinearRed,
            t.Transform.GetRotation().Rotator().ToUeRotator(),
            3,
            5,
          );
          break;
        case "Sphere":
          t = this.RangeInfo;
          UE.KismetSystemLibrary.D_DrawDebugSphere(
            this,
            t.Transform.GetLocation().ToUeVector(),
            t.Radius,
            24,
            ColorUtils_1.ColorUtils.LinearRed,
            3,
            5,
          );
      }
  }
}
exports.default = TsTaskAirTerritoryWander;
//# sourceMappingURL=TsTaskAirTerritoryWander.js.map
